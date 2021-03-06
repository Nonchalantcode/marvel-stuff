import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import DetailedInfoSection from "../Components/Sections/DetailedInfoSection";

const ComicDetailView = () => {
  const { comicId } = useParams();
  const [comicDetail, setComicDetail] = useState({});
  const [comicInfoUrl, setComicInfoUrl] = useState([]);
  const [characterComics, setCharacterComics] = useState([]);
  const [storyComics, setStoryComics] = useState([]);

  const endPointUrl = `${process.env.REACT_APP_ROOT_URL}/comics/${comicId}?${process.env.REACT_APP_ROOT_KEY}`;

  useEffect(() => {
    axios
      .get(endPointUrl)
      .then(function (response) {
        const comicInfo = response.data.data.results[0];
        setComicDetail(comicInfo);
        setComicInfoUrl(comicInfo.urls);
        setCharacterComics(comicInfo.characters.items);
        setStoryComics(comicInfo.stories.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [endPointUrl]);

  const renderImage = () => {
    return Object.entries(comicDetail).length === 0 ? (
      <img
        src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        className="img-thumbnail"
        alt=""
      ></img>
    ) : (
      <img
        src={`${comicDetail.thumbnail.path}.${comicDetail.thumbnail.extension}`}
        className="img-thumbnail"
        alt=""
      ></img>
    );
  };

  const renderCharInformation = () => {
    return (
      <>
        <h3>{comicDetail.title}</h3>
        <p className="text-start">
          {!comicDetail.description
            ? (comicDetail.description =
                "There is no description available for this character, visit the links below for more information...")
            : comicDetail.description}
        </p>

        <div className="my-4">
          <h3>Characters</h3>
          <DetailedInfoSection information={characterComics} />
        </div>

        <div>
          <h3>Stories</h3>
          <DetailedInfoSection information={storyComics} />
        </div>

        <div>
          <ul>
            <h4 className="mt-4">
              Learn more about this Comic in the following links
            </h4>
            {renderComicWikiLinks()}
          </ul>
        </div>
      </>
    );
  };

  const renderComicWikiLinks = () => {
    return comicInfoUrl.map((url) => {
      return (
        <span
          className="badge rounded-pill bg-primary m-1 p-2 text-capitalize"
          key={url.type}
        >
          <Link to={{ pathname: url.url }} target="_blank" rel="noreferrer" className="text-light text-decoration-none text-capitalize">
            {url.type}
          </Link>
        </span>
      );
    });
  };

  // const renderComicWikiLinks = () => {
  //   return comicInfoUrl.map((url) => {
  //     return (
  //       <li className="text-start text-capitalize" key={url.type}>
  //         <Link to={{ pathname: url.url }} target="_blank" rel="noreferrer">
  //           {url.type}
  //         </Link>
  //       </li>
  //     );
  //   });
  // };

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-4">{renderImage()}</div>
          <div className="col-8">{renderCharInformation()}</div>
        </div>
      </div>
    </>
  );
};

export default ComicDetailView;
