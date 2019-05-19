export function extractQueryParamValues (url, tokens) {
  const params = new URLSearchParams(url);
  let results = {};
  // can accept array or string
  if( typeof tokens === 'string') {
    results[tokens] =  params.get(tokens);
    return results;  
  }
  tokens.forEach(token => {
    results[token] = params.get(token);
  });
  return results;
}