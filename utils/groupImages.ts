export default (
  cover_image: String,
  medias: Array<{ url: String; type: String; id?: number }>
) => {
  const temp = { content: cover_image, type: "image" };

  if (medias) {
    let value = medias.map((element) => {
      return {
        content: element.url,
        type: "image",
      };
    });
    console.log(value);
    return [temp, ...value];
  } else return [temp];
};
