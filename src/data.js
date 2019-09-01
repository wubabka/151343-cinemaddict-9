import {getRandomInt, getRandomDate} from './utils';

export const getFilmCard = () => ({
  title: [
    `qq1`,
    `qq2`,
    `qq3`,
    `qq4`,
    `qq5`,
    `qq6`,
    `qq7`,
    `qq8`,
    `qq9`,
    `qq10`,
    `qq11`,
    `qq12`,
    `qq13`,
    `qq14`,
    `qq15`,
  ][getRandomInt(0, 15)],
  poster: [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ][getRandomInt(0, 7)],
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ],
  rating: Number((Math.random() * (10 - 1) + 1).toFixed(2)),
  // year: [
  //   2000,
  //   2001,
  //   2002,
  //   2003,
  //   2004,
  //   2005
  // ][getRandomInt(0, 6)],
  year: getRandomDate(new Date(1900, 0, 1), new Date()),
  duration: [
    `1h 45m`,
    `1h 55m`,
    `2h 5m`,
    `2h 50m`,
    `2h`,
  ][getRandomInt(0, 5)],
  genres: [
    `Comedy`,
    `Horror`,
    `Drama`
  ][getRandomInt(0, 3)],
  commentCount: Number(Math.floor(Math.random() * 100)),
  emoji: [
    `angry.png`,
    `puke.png`,
    `sleeping.png`,
    `smile.png`,
  ][getRandomInt(0, 4)],
  commentText: [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
  ][getRandomInt(0, 4)],
  author: [
    `Tim Macoveev`,
    `John Doe`,
    `Heinz Herald`,
    `Dan Duryea`,
  ][getRandomInt(0, 4)],
  day: [
    `1 day ago`,
    `2 days ago`,
    `3 days ago`,
    `today`
  ][getRandomInt(0, 4)]
});

export const getFilter = () => ([
  {
    title: `Watchlist`,
    count: 13
  },
  {
    title: `History`,
    count: 8
  },
  {
    title: `Favorites`,
    count: 6
  },
]);


export const getProfile = () => (
  [
    ``,
    `novice`,
    `fan`,
    `movie buff`
  ][Math.floor(Math.random() * 4)]
);
