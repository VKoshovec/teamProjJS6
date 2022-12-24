import { doc } from 'firebase/firestore/lite';

export function getVideoTemplates(key) {
  return `
   <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/${key}"
  title="YouTube video player" frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>
   `;
}

// const id = '877269';

export function getFetchVideo(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}//videos?api_key=0bf9a11da9d083f4751315d07dcbd89b`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
}

// getFetchVideo(id).then(({ results }) => {
//   console.log(results);
//   const teaser = results.map(video => video);
//   const treiler = teaser[teaser.length - 1];
//   terailerKey = treiler.key;
//   const list = getVideoTemplates(terailerKey);

//   return list;
// });
