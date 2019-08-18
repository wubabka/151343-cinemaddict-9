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
  ][Math.floor(Math.random() * 15)],
  poster: [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ][Math.floor(Math.random() * 7)],
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
  year: [
    2000,
    2001,
    2002,
    2003,
    2004,
    2005
  ][Math.floor(Math.random() * 6)],
  duration: [
    `1h 45m`,
    `1h 55m`,
    `2h 5m`,
    `2h 50m`,
    `2h`,
  ][Math.floor(Math.random() * 5)],
  genres: [
    `Comedy`,
    `Horror`,
    `Drama`
  ][Math.floor(Math.random() * 3)],
  commentCount: Number(Math.floor(Math.random() * 100))
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
