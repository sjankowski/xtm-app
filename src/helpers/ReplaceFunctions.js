export const replaceOne = (array, replaceWith) => {
  return array.map((result, i) => {
    if (i === 0) {
      const parser = new DOMParser();
      const element = parser.parseFromString(result.snippet, 'text/html');
      const span = element.getElementsByTagName('span');
      span[0].textContent = replaceWith;
      result.snippet = element.body.innerHTML;
    }
    return result;
  });
};

export const replaceAll = (array, replaceWith) => {
  return array.map((result) => {
    const parser = new DOMParser();
    const element = parser.parseFromString(result.snippet, 'text/html');
    const span = element.getElementsByTagName('span');
    for (var i = 0; i < span.length; i++) {
      span[i].textContent = replaceWith;
    }
    result.snippet = element.body.innerHTML;
    return result;
  });
};
