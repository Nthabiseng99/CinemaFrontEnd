// import mov from "movie-trailer"
import axios from "axios";
import { ResolvingMetadata, Metadata } from "next";
import Image from "next/image";
import YouTube, { YouTubePlayer } from "react-youtube";
export async function generateStaticMovie(str: string) {
  const req = await fetch("http://192.168.3.3:8084/movie/" + str).then(
    (res) => res.json()
  );
  console.log(req);
  return req;
}
export async function generateStaticGenres(str: string) {
  const req = await axios
    .get("http://192.168.3.3:8084/movie/" + str)
    .then((res) => res.data.genres);
  // console.log(req);
  return req;
}
export async function getTrailer(str: string) {
  const url = `https://api.themoviedb.org/3/movie/${str}/videos?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODVmMWU4NTUxOGM2NDRkYTJjOWUzOWY3ZWZkNGQxNyIsInN1YiI6IjYwYmMyZWI1Y2E0ZjY3MDA1OWUyMzBkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pwdrejarorYnUj1DOhlfP_Q4GYKqGP6W41SR31UT0iI",
    },
  };

  const req = await fetch(url, options)
    .then((res) =>
      res
        .json()
        .then((data) =>
          data.results.find(
            (x: { official: boolean; type: string }) =>
              x.official == true && x.type == "Trailer"
          )
        )
    )
    // .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
  return req;
}
type Props = {
  params: { id: string };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const req = await generateStaticMovie(id);
  return {
    title: req.title,
  };
}
type movieId = {
  id: string;
};
const PageHead = async ({ id }: movieId) => {
  const data = await generateStaticMovie(id);
  const data2 = await getTrailer(id);
  const genres = await generateStaticGenres(id);

  return (
    <div className="p-5">
      {/* <PageHead /> */}
      {/* {JSON.stringify(data2)} */}
      <div className="movie-container flex justify-between gap-3">
        <div className="">
          <h3 className="font-sans font-bold text-3xl">{data.title}</h3>
          <div className="flex gap-4">
            {data.genres.map((g: { name: string }) => (
              <div className="font-medium">
                <p className="text-orange-400">{g.name}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-100 p-2 rounded-xl">
            <h3 className="text-xl text-orange-400 pb-2">Overview</h3>
            <p>{data.overview}</p>
            <p className="font-sans font-normal text-orange-400">
              Release Date : {data.releaseDate}
            </p>
            <p>Ratting : {data.ratting}</p>
          </div>
        </div>
        <div className="">
          {data2?.key ? (
            <div>
              <iframe
                width={560}
                height="315"
                src={`https://www.youtube.com/embed/${data2?.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          ) : (
            <div>
              <Image
                className="card-image"
                src={"https://image.tmdb.org/t/p/original" + data.backdropImg}
                width={799}
                height={315}
                objectFit="contain"
                alt={data.title}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHead;
