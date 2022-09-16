export function getBookFromGoogleBookApi(theGoogleBook) {
  return {
    id: theGoogleBook?.id,
    title: theGoogleBook?.volumeInfo?.title,
    subtitle: theGoogleBook?.volumeInfo?.subtitle,
    authors: theGoogleBook?.volumeInfo?.authors,
    publisher: theGoogleBook?.volumeInfo?.publisher,
    publishedDate: theGoogleBook?.volumeInfo?.publishedDate,
    description: theGoogleBook?.volumeInfo?.description,
    pageCount: theGoogleBook?.volumeInfo?.pageCount,
    categories: theGoogleBook?.volumeInfo?.categories,
    thumbnail: theGoogleBook?.volumeInfo?.imageLinks?.thumbnail,
    smallThumbnail: theGoogleBook?.volumeInfo?.imageLinks?.smallThumbnail,
    language: theGoogleBook?.volumeInfo?.language,
    previewLink: theGoogleBook?.volumeInfo?.previewLink,
    industryIdentifiers: theGoogleBook?.volumeInfo?.industryIdentifiers,
    googleId: theGoogleBook?.id,
    isbn13: theGoogleBook?.volumeInfo?.industryIdentifiers?.find(
      (identifier) => identifier.type === "ISBN_13"
    )?.identifier,
    isbn10: theGoogleBook?.volumeInfo?.industryIdentifiers?.find(
      (identifier) => identifier.type === "ISBN_10"
    )?.identifier,
  };
}

export function hydrateBooks(anArrayOfGoogleBooks) {
  return anArrayOfGoogleBooks.map((theGoogleBook) => {
    return getBookFromGoogleBookApi(theGoogleBook);
  });
}
