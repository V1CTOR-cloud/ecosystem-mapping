import gql from "graphql-tag";
export const INFO = gql`
  {
    eventProfiles(orderBy: createdAt_DESC) {
      id
      eventOrganiser {
        eventorganiserName
      }
      eventImage {
        url
      }
      startDateTime
      eventTitle
      eventLocation {
        city
        id
      }
      eventDescription
      eventUrl
      eventContactEmail
      fromPhaseAutomated
      fromPhaseManual
      toPhaseAutomated
      toPhaseManual
    }
  }
`;
export const SEARCH_QUERY = gql`
  query event($value: String!) {
    eventProfiles(
      where: {
        OR: [
          { eventDescription_contains: $value }
          { eventTitle_contains: $value }
          { eventOrganiser: { eventorganiserName_contains: $value } }
        ]
      }
    ) {
      eventOrganiser {
        eventorganiserName
      }
      eventImage {
        url
      }
      startDateTime
      eventTitle
      eventLocation {
        city
      }
      eventDescription
      eventUrl
    }
  }
`;
export const SEARCH_LOCATION_QUERY = gql`
  query event($value: String!) {
    eventProfiles(where: { eventLocation: { city_contains: $value } }) {
      eventOrganiser {
        eventorganiserName
      }
      eventImage {
        url
      }
      startDateTime
      eventTitle
      eventLocation {
        city
      }
      eventDescription
      eventUrl
    }
  }
`;
