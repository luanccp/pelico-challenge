export const SEARCH_REPOSITORIES = `
  query($query: String!, $count: Int!) {
    search(query: $query, type: REPOSITORY, first: $count) {
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
            }
            description
            url
          }
        }
      }
    }
  }
`;
