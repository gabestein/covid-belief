//lib/api.js
const API_ENDPOINT = `https://api.takeshape.io/project/${process.env.TAKESHAPE_PROJECT}/v3/graphql`;
const TAKESHAPE_API_KEY = process.env.TAKESHAPE_API_KEY;

const fetchData = async(query, { variables } = {}) =>{
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TAKESHAPE_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const responseJson = await res.json();
  if (responseJson.errors) {
    console.error("Something went Wrong. Failed to fetch API!!\n\n" + JSON.stringify(responseJson.errors));
  }
  return responseJson.data;
}

// get all posts to display on landing page
export async function getAllAttitudes() {
    const data = await fetchData(
      `
        query AllAttitudes {
          allAttitudes: getAttitudeList {
              items {
                _id
                title
                slug
                descriptionHtml
                character {
                    _id
                }
                arguments {
                  _id
                  slug
                  descriptionHtml
                }
              }
            }
        }
      `
    );
    return data.allAttitudes.items;
  }
  
  // get all slugs of the posts to generate static paths
  export async function getAllAttitudeSlugs() {
    const data = await fetchData(`
        {
          allAttitudes: getAttitudeList {
            items {
              slug
            }
          }
        }
      `);
    return data.allAttitudes.items;
  }
  
  // get single post based on the slug passed
  export async function getAttitudeBySlug(slug) {
    const data = await fetchData(
      `
        query AttitudeBySlug($slug: String) {
          attitude: getAttitudeList(where: {slug: {eq: $slug}}) {
            items {
              _id
              title
              slug
              descriptionHtml
              detailsHtml
              character {
                  _id
              }
            }
          }
        }`,
      {
        variables: {
          slug,
        },
      }
    );
    return data.attitude.items[0];
  }