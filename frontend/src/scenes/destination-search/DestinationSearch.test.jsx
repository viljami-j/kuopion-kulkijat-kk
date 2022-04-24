import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DestinationSearch, { SearchResults } from "./DestinationSearch";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";

fetchMock.enableMocks();

describe("Destination search tests", () => {
  test("All search results are rendered", () => {
    render(
      <BrowserRouter>
        <SearchResults searchResults={searchResults} />
      </BrowserRouter>
    );
    const displayedResults = screen.getAllByRole("button");
    expect(displayedResults).toHaveLength(4);
  });

  test("Destinations are loaded on mount", async () => {
    render(
      <BrowserRouter>
        <DestinationSearch />
      </BrowserRouter>
    );
    await act(async () => {
      await flushPromises();
    });
    expect(fetch.mock.calls.length).toEqual(1);
  });

  test("Search field is typeable", async () => {
    render(
      <BrowserRouter>
        <DestinationSearch />
      </BrowserRouter>
    );
    await act(async () => {
      await flushPromises();
    });
    const searchField = screen.getByRole("textbox");
    fireEvent.change(searchField, { target: { value: "Pullonpohja" } });
    expect(searchField).toHaveValue("Pullonpohja");
  });
});

const flushPromises = () => new Promise(process.nextTick);

const searchResults = [
  {
    idmatkakohde: 1,
    kohdenimi: "Pullonpohja",
    maa: "Uzbekistan",
    paikkakunta: "Toshkent",
    kuvausteksti:
      "Tervetuloa viihtyisään Pullonpohjaan, ehta suomalainen baarihotelli hyvin eksoottisella alueella!",
    kuva: "ei implementoitu",
  },
  {
    idmatkakohde: 2,
    kohdenimi: "Tšernobylin matkakeskus",
    maa: "Ukraina",
    paikkakunta: "Tšernobyl",
    kuvausteksti:
      "Miltä näyttää tunnetun ydinonnettomuuden jälkeinen Tšernobylin hylätty kaupunki? Tule ja tutustu koulutettujen ohjaajiemme kanssa!",
    kuva: "ei implementoitu",
  },
  {
    idmatkakohde: 3,
    kohdenimi: "Porvoon makeistukku",
    maa: "Suomi",
    paikkakunta: "Porvoo",
    kuvausteksti: "Tutustu Porvoon makeiden makujen aatelistoon!",
    kuva: "ei implementoitu",
  },
  {
    idmatkakohde: 4,
    kohdenimi: "Le Batonque",
    maa: "Ranska",
    paikkakunta: "Pariisi",
    kuvausteksti:
      "Tervetuloa Ranskan viihtyisimpään hotelliin jonka kylkeen on avannut ovensa jo moni ranskalainen leipomo- ja konditoriatuoteyrittäjä. Läheltä löydät myös kiinnostavat Pariisin katakombit!",
    kuva: "ei implementoitu",
  },
];
