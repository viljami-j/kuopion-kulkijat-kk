/**
 * Author's notes:
 * This file requires heavy refactoring.
 */

const sql = require("./db.js");

const Journey = function (journey) {};

function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

const blobToBase64 = (blob, callback) => {
  const convert = (blob_data) => {
    let data = blob_data;
    let buff = Buffer.from(data);
    return buff.toString("base64");
  };

  let data = [];
  if (blob[0]) {
    blob.forEach((v, i) => {
      Object.values(blob[i]).forEach((value) => {
        let obj = { image: convert(value) };
        data.push(obj);
      });
    });
  }

  callback(data);
};

Journey.findByJourneyId = (idmatka, result) => {
  const send_error = (err) => {
    console.log("error:\n", err);
    result(err, null);
  };

  const recursive_story_query = (payload) => {
    if (
      payload.recursion.isLocalDone(
        payload,
        "done loading stories (journey " +
          (payload.recursion.global_running_value + 1) +
          " out of " +
          (payload.recursion.global_end_condition + 1) +
          ")"
        // note to self: consider adding additional callback parameter for what happens when global is n == n, to make it easier to follow which part of recursion is going on
      )
    ) {
      sql.query(
        `SELECT idtarina AS storyId, idmatka AS destinationId, DATE_FORMAT(pvm, '%Y-%m-%d') AS date, teksti AS text FROM tarina WHERE (idmatka = ${
          payload.recursion.journeys[payload.recursion.global_running_value]
            .journeyId
        })`,
        (err, queried_stories) => {
          if (err) send_error(err);

          if (
            // If all journeys are iterated
            payload.recursion.global_running_value ==
            payload.recursion.global_end_condition
          ) {
            // Initialize payload for second layer & shift layers
            if (queried_stories.length > 0)
              payload.recursion.stories.push(queried_stories);

            payload.recursion.global_running_value = 0;
            // refactor into payload function
            if (queried_stories.length > 0) {
              payload.recursion.local_shift_condition =
                queried_stories.length - 1;
            } else payload.recursion.local_shift_condition = 0;

            recursive_image_query(payload);
          } else {
            // Otherwise continue recursion
            if (queried_stories.length > 0)
              payload.recursion.stories.push(queried_stories);

            payload.recursion.global_running_value += 1;
            recursive_story_query(payload);
          }
        }
      );
    } else {
      sql.query(
        `SELECT idtarina AS storyId, idmatka AS destinationId, DATE_FORMAT(pvm, '%Y-%m-%d') AS date, teksti AS text FROM tarina WHERE (idmatka = ${
          payload.recursion.journeys[payload.recursion.local_running_value]
            .journeyId
        })`,
        (err, queried_stories) => {
          if (err) send_error(err);
          if (queried_stories.length > 0)
            payload.recursion.stories.push(queried_stories);
          payload.recursion.local_running_value += 1;

          recursive_story_query(payload);
        }
      );
    }
  };

  const fetchAllJourneys = (payload) => {
    recursive_story_query(payload);
  };

  const recursive_image_query = (payload) => {
    // Consider journeys that don't have stories
    if (
      payload.recursion.stories[payload.recursion.global_running_value] ===
      undefined
    ) {
      payload.recursion.stories.push([]);
    }
    //

    if (
      payload.recursion.isLocalDone(
        payload,
        "done loading images for stories (journey " +
          (payload.recursion.global_running_value + 1) +
          " out of " +
          (payload.recursion.global_end_condition + 1) +
          ")"
      )
    ) {
      if (
        getSafe(
          () =>
            payload.recursion.stories[payload.recursion.global_running_value][
              payload.recursion.local_running_value
            ].storyId,
          "empty"
        ) !== "empty"
      ) {
        sql.query(
          `SELECT kuva AS image FROM kuva WHERE idtarina=${
            payload.recursion.stories[payload.recursion.global_running_value][
              payload.recursion.local_running_value
            ].storyId
          }`,
          (err, storyimgs) => {
            if (err) send_error(err);
            blobToBase64(storyimgs, (b64_storyimgs) => {
              payload.recursion.images.push(b64_storyimgs);
              if (
                payload.recursion.global_running_value ==
                payload.recursion.global_end_condition
              ) {
                result(null, format_response(payload));
              } else {
                payload.recursion.local_shift_condition =
                  payload.recursion.stories[
                    payload.recursion.global_running_value
                  ].length - 1;
                payload.recursion.global_running_value += 1;
                recursive_image_query(payload);
              }
            });
          }
        );
      } else {
        payload.recursion.images.push([]);
        if (
          payload.recursion.global_running_value ==
          payload.recursion.global_end_condition
        ) {
          result(null, format_response(payload));
        } else recursive_image_query(payload);
      }
    } else {
      if (
        getSafe(
          () =>
            payload.recursion.stories[payload.recursion.global_running_value][
              payload.recursion.local_running_value
            ].storyId,
          "empty"
        ) !== "empty"
      ) {
        sql.query(
          `SELECT kuva AS image FROM kuva WHERE idtarina=${
            payload.recursion.stories[payload.recursion.global_running_value][
              payload.recursion.local_running_value
            ].storyId
          }`,
          (err, storyimgs) => {
            if (err) send_error(err);
            blobToBase64(storyimgs, (b64_storyimgs) => {
              payload.recursion.images.push(b64_storyimgs);
              payload.recursion.local_running_value += 1;

              recursive_image_query(payload);
            });
          }
        );
      } else {
        payload.recursion.images.push([]);
        payload.recursion.local_running_value += 1;

        recursive_image_query(payload);
      }
    }
  };

  const format_response = (payload) => {
    payload.recursion.journeys.forEach((element, journeyInd) => {
      payload.journeys.push({
        startDate: element.startDate,
        endDate: element.endDate,
        private: element.private,
        stories: payload.recursion.stories[journeyInd].map(
          (story, storyInd) => ({
            ...story,
            images: payload.recursion.images[storyInd],
          })
        ),
      });
    });

    return payload.journeys;
  };

  sql.query(
    `SELECT idmatka AS journeyId, DATE_FORMAT(alkupvm, '%Y-%m-%d') AS startDate, DATE_FORMAT(loppupvm, '%Y-%m-%d') AS endDate,yksityinen AS private FROM matka WHERE idmatka = ${idmatka}`,
    (err_journeydata, journeys) => {
      if (err_journeydata) send_error(err_journeydata);

      let payload = {
        journeys: [],
        stories: [],
        images: [],
        recursion: {
          // global: root objective of recursion - in this case, journeys
          // local: child objective of recursion - e.g. fetching stories or pictures of a journey
          journeys: journeys,
          stories: [],
          images: [],
          global_running_value: 0,
          global_end_condition: journeys.length - 1,
          local_running_value: 0,
          local_shift_condition: 0,
          isLocalDone: (payload, local_done_msg) => {
            if (payload.recursion === undefined) {
              console.log(
                "Error: isLocalDone() is missing it's 'payload' parameter!"
              );
              throw "isLocalDone() is missing it's 'payload' parameter!";
            }
            if (
              payload.recursion.local_running_value ==
              payload.recursion.local_shift_condition
            ) {
              payload.recursion.local_running_value = 0;

              console.log("Payload local ::", local_done_msg);

              return true;
            } else return false;
          },
          isGlobalDone: (payload, global_done_msg) => {
            if (payload.recursion === undefined) {
              console.log(
                "Error: isGlobalDone() is missing it's 'payload' parameter!"
              );
              throw "isGlobalDone() is missing it's 'payload' parameter!";
            }
            if (
              payload.recursion.global_running_value ==
              payload.recursion.global_end_condition
            ) {
              payload.recursion.global_running_value = 0;

              console.log("Payload global ::", global_done_msg);

              return true;
            } else return false;
          },
        },
      };

      if (journeys.length) {
        fetchAllJourneys(payload);
      } else result({ kind: "not_found" }, null); // journeys not found with provided user id
    }
  );
};

Journey.findByUserId = (idmatkaaja, result) => {
  const send_error = (err) => {
    console.log("error:\n", err);
    result(err, null);
  };

  const recursive_story_query = (payload) => {
    if (
      payload.recursion.isLocalDone(
        payload,
        "done loading stories (journey " +
          (payload.recursion.global_running_value + 1) +
          " out of " +
          (payload.recursion.global_end_condition + 1) +
          ")"
        // note to self: consider adding additional callback parameter for what happens when global is n == n, to make it easier to follow which part of recursion is going on
      )
    ) {
      sql.query(
        `SELECT idtarina AS storyId, idmatka AS destinationId, DATE_FORMAT(pvm, '%Y-%m-%d') AS date, teksti AS text FROM tarina WHERE (idmatka = ${
          payload.recursion.journeys[payload.recursion.global_running_value]
            .journeyId
        })`,
        (err, queried_stories) => {
          if (err) send_error(err);

          if (
            // If all journeys are iterated
            payload.recursion.global_running_value ==
            payload.recursion.global_end_condition
          ) {
            // Initialize payload for second layer & shift layers
            if (queried_stories.length > 0)
              payload.recursion.stories.push(queried_stories);

            payload.recursion.global_running_value = 0;
            // refactor into payload function
            if (queried_stories.length > 0) {
              payload.recursion.local_shift_condition =
                queried_stories.length - 1;
            } else payload.recursion.local_shift_condition = 0;

            recursive_image_query(payload);
          } else {
            // Otherwise continue recursion
            if (queried_stories.length > 0)
              payload.recursion.stories.push(queried_stories);

            payload.recursion.global_running_value += 1;
            recursive_story_query(payload);
          }
        }
      );
    } else {
      sql.query(
        `SELECT idtarina AS storyId, idmatka AS destinationId, DATE_FORMAT(pvm, '%Y-%m-%d') AS date, teksti AS text FROM tarina WHERE (idmatka = ${
          payload.recursion.journeys[payload.recursion.local_running_value]
            .journeyId
        })`,
        (err, queried_stories) => {
          if (err) send_error(err);
          if (queried_stories.length > 0)
            payload.recursion.stories.push(queried_stories);
          payload.recursion.local_running_value += 1;

          recursive_story_query(payload);
        }
      );
    }
  };

  const fetchAllJourneys = (payload) => {
    recursive_story_query(payload);
  };

  const recursive_image_query = (payload) => {
    // Consider journeys that don't have stories
    if (
      payload.recursion.stories[payload.recursion.global_running_value] ===
      undefined
    ) {
      payload.recursion.stories.push([]);
    }
    //

    if (
      payload.recursion.isLocalDone(
        payload,
        "done loading images for stories (journey " +
          (payload.recursion.global_running_value + 1) +
          " out of " +
          (payload.recursion.global_end_condition + 1) +
          ")"
      )
    ) {
      if (
        getSafe(
          () =>
            payload.recursion.stories[payload.recursion.global_running_value][
              payload.recursion.local_running_value
            ].storyId,
          "empty"
        ) !== "empty"
      ) {
        sql.query(
          `SELECT kuva AS image FROM kuva WHERE idtarina=${
            payload.recursion.stories[payload.recursion.global_running_value][
              payload.recursion.local_running_value
            ].storyId
          }`,
          (err, storyimgs) => {
            if (err) send_error(err);
            blobToBase64(storyimgs, (b64_storyimgs) => {
              payload.recursion.images.push(b64_storyimgs);
              if (
                payload.recursion.global_running_value ==
                payload.recursion.global_end_condition
              ) {
                result(null, format_response(payload));
              } else {
                payload.recursion.local_shift_condition =
                  payload.recursion.stories[
                    payload.recursion.global_running_value
                  ].length - 1;
                payload.recursion.global_running_value += 1;
                recursive_image_query(payload);
              }
            });
          }
        );
      } else {
        payload.recursion.images.push([]);
        if (
          payload.recursion.global_running_value ==
          payload.recursion.global_end_condition
        ) {
          result(null, format_response(payload));
        } else recursive_image_query(payload);
      }
    } else {
      if (
        getSafe(
          () =>
            payload.recursion.stories[payload.recursion.global_running_value][
              payload.recursion.local_running_value
            ].storyId,
          "empty"
        ) !== "empty"
      ) {
        sql.query(
          `SELECT kuva AS image FROM kuva WHERE idtarina=${
            payload.recursion.stories[payload.recursion.global_running_value][
              payload.recursion.local_running_value
            ].storyId
          }`,
          (err, storyimgs) => {
            if (err) send_error(err);
            blobToBase64(storyimgs, (b64_storyimgs) => {
              payload.recursion.images.push(b64_storyimgs);
              payload.recursion.local_running_value += 1;

              recursive_image_query(payload);
            });
          }
        );
      } else {
        payload.recursion.images.push([]);
        payload.recursion.local_running_value += 1;

        recursive_image_query(payload);
      }
    }
  };

  const format_response = (payload) => {
    payload.recursion.journeys.forEach((element, journeyInd) => {
      payload.journeys.push({
        startDate: element.startDate,
        endDate: element.endDate,
        private: element.private,
        stories: payload.recursion.stories[journeyInd].map(
          (story, storyInd) => ({
            ...story,
            images: payload.recursion.images[storyInd],
          })
        ),
      });
    });

    return payload.journeys;
  };

  sql.query(
    `SELECT idmatka AS journeyId, DATE_FORMAT(alkupvm, '%Y-%m-%d') AS startDate, DATE_FORMAT(loppupvm, '%Y-%m-%d') AS endDate,yksityinen AS private FROM matka WHERE idmatkaaja = ${idmatkaaja}`,
    (err_journeydata, journeys) => {
      if (err_journeydata) send_error(err_journeydata);

      let payload = {
        journeys: [],
        stories: [],
        images: [],
        recursion: {
          // global: should be renamed to journey_running_value or something better - it's a helper variable for traversing through all journeys
          // local: a function's current base case controller
          journeys: journeys,
          stories: [],
          images: [],
          global_running_value: 0,
          global_end_condition: journeys.length - 1,
          local_running_value: 0,
          local_shift_condition: 0,
          isLocalDone: (payload, local_done_msg) => {
            if (payload.recursion === undefined) {
              console.log(
                "Error: isLocalDone() is missing it's 'payload' parameter!"
              );
              throw "isLocalDone() is missing it's 'payload' parameter!";
            }
            if (
              payload.recursion.local_running_value ==
              payload.recursion.local_shift_condition
            ) {
              payload.recursion.local_running_value = 0;

              console.log("Payload local ::", local_done_msg);

              return true;
            } else return false;
          },
          isGlobalDone: (payload, global_done_msg) => {
            if (payload.recursion === undefined) {
              console.log(
                "Error: isGlobalDone() is missing it's 'payload' parameter!"
              );
              throw "isGlobalDone() is missing it's 'payload' parameter!";
            }
            if (
              payload.recursion.global_running_value ==
              payload.recursion.global_end_condition
            ) {
              payload.recursion.global_running_value = 0;

              console.log("Payload global ::", global_done_msg);

              return true;
            } else return false;
          },
        },
      };

      if (journeys.length) {
        fetchAllJourneys(payload);
      } else result({ kind: "not_found" }, null); // journeys not found with provided user id
    }
  );
};

module.exports = Journey;
