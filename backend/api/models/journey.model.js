const sql = require("./db.js");

const Journey = function (journey) {};

Journey.findById = (idmatkaaja, result) => {
  const blobToBase64 = function (blob, callback) {
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

  const recursive_image_query = (
    journey_data,
    journey_stories,
    journey_images,
    running_value,
    end_condition
  ) => {
    if (running_value == end_condition) {
      sql.query(
        `SELECT kuva AS image FROM kuva WHERE idtarina=${journey_stories[running_value].storyId}`,
        (err_storyimgs, storyimgs) => {
          if (err_storyimgs) {
            console.log("error while fetching story images: ", err_storyimgs);
            result(err_storyimgs, null);
            return;
          }
          blobToBase64(storyimgs, (b64_storyimgs) => {
            journey_images.push(b64_storyimgs);
            result(
              null,
              format_queried_journey(
                journey_data[0],
                journey_stories,
                journey_images
              )
            );
          });
        }
      );
    } else {
      sql.query(
        `SELECT kuva AS image FROM kuva WHERE idtarina=${journey_stories[running_value].storyId}`,
        (err_storyimgs, storyimgs) => {
          if (err_storyimgs) {
            console.log("error while fetching story images: ", err_storyimgs);
            result(err_storyimgs, null);
            return;
          }
          blobToBase64(storyimgs, (b64_storyimgs) => {
            journey_images.push(b64_storyimgs);

            recursive_image_query(
              journey_data,
              journey_images,
              running_value + 1,
              end_condition
            );
          });
        }
      );
    }
  };

  const format_queried_journey = (general, stories, imgs) => {
    var response =
      // aka. journey

      {
        startDate: general.startDate,
        endDate: general.endDate,
        private: general.private,
        stories: [...stories].map((story, ind) => ({
          ...story,
          images: imgs[ind],
        })),
      };

    return response;
  };

  var query_journeydata = `SELECT idmatka AS journeyId, DATE_FORMAT(alkupvm, '%Y-%m-%d') AS startDate, DATE_FORMAT(loppupvm, '%Y-%m-%d') AS endDate,yksityinen AS private FROM matka WHERE idmatkaaja = ${idmatkaaja}`;

  sql.query(query_journeydata, (err_journeydata, journey_data) => {
    if (err_journeydata) {
      console.log("error while fetching journey data: ", err_journeydata);
      result(err_journeydata, null);
      return;
    }

    if (journey_data.length) {
      var query_journeystories = `SELECT idtarina AS storyId, idmatka AS destinationId, DATE_FORMAT(pvm, '%Y-%m-%d') AS date, teksti AS text FROM tarina WHERE (idmatka = ${journey_data[0].journeyId})`;

      sql.query(query_journeystories, (err_journeystories, journey_stories) => {
        if (err_journeystories) {
          console.log(
            "error while fetching journey stories: ",
            err_journeyimgs
          );
          result(err_journeyimgs, null);
          return;
        }

        if (journey_stories.length) {
          var count = 0;
          var end_condition = journey_stories.length - 1;

          sql.query(
            `SELECT kuva AS image FROM kuva WHERE idtarina=${journey_stories[count].storyId}`,
            (err_storyimgs, storyimgs) => {
              if (err_storyimgs) {
                console.log(
                  "error while fetching story images: ",
                  err_storyimgs
                );
                result(err_storyimgs, null);
                return;
              }

              blobToBase64(storyimgs, (b64_storyimgs) => {
                var journey_images = [b64_storyimgs];
                recursive_image_query(
                  journey_data,
                  journey_stories,
                  journey_images,
                  count + 1,
                  end_condition
                );
              });
            }
          );

          return;
        }
      });
    } else result({ kind: "not_found" }, null); // journeys not found with provided user id
  });
};

module.exports = Journey;
