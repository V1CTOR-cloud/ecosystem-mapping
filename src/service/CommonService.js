import axios from "axios";
import { GraphQLClient } from "graphql-request";

class Service {
  async getPointsFromURL(title, desc) {
    return await axios
      .get(
        `http://ec2-52-14-122-196.us-east-2.compute.amazonaws.com:8080/predict?event_name=${title}&event_des=${desc}`
      )
      .then((res) => {
        return res;
      });
  }
  async getData() {
    const graphcms = new GraphQLClient(
      "https://api-eu-central-1.graphcms.com/v2/ckpwkoq9vil5o01wk32cc5s39/master",
      {
        headers: {
          authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MjQ4NTc2NDIsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrcHdrb3E5dmlsNW8wMXdrMzJjYzVzMzkvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNDRkMjgxMTgtMmIyOS00ZDM4LTkwMzQtY2MxMWEzNzRiYzE1IiwianRpIjoiY2txZzZhZGFiOXdqYzAxejM0bjQ5NXFmaSJ9.QGrerKGZY31M_ohnyCTWCTYiZ9lG1Qfo64U0pmyEUFzmJAYNz8d_7P_7AXWc1PHQ7jzGsu7GMnnKLzxrDRBEptaiOwnAE9ed03G--okXIHnwjDUETjdqFXHfas3gEYRrGhyx_tFjLPGGkJQtJ-vUHGJO_928t2qMW1tz9P-Op3NvOBzcNj1MVWN2j9fZ2M_vd2x-ahp4ylEA-jzj_T4cOOyNmw_3izRkf1o8B0k65-U9MxZqe6FH0l4P0jli8VptNNnbSasNg9FbNXc73Tg1xQ2qRKVIAHJtL7pT8MtAzmlTaVdwk6mpKfvBfxqVaSUxSonqpAy5F7NZfY5RXDp1MNSZ3fiBD9p8qp46s6cwg274iPD3N9mFlzPSoCzQKQJTuUW-Pyi0pBFqt21dEzXb34vfGEgiNhsGu5ujG0fBbB--FkepEuyPTbcqZRM2wmjHbLZzNyAImqUkGYvETdHyNeTDkv9AUA8YkruaHNG1UEtKYt1a41RezMAoK6QIBKJz0EpdYuWqLcqn1KNH_wtCqJPTfTsHT5acCupzJlfwl0X_vNNoPNJGSjmuMoBvJBEh8kL6M0gY-pzbFpDLr2dVBiMdQxdYlDjSs_Sxx4qUDx8Gz6yYqDvRiNLdZ8JYlrraMH3GkENFg8hC9-MSJ8rkIWrhxr7cGd342VhOPu70YAU`,
        },
      }
    );
    const res = await graphcms.request(
      `  {
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
      }`
    );
    return res;
  }
  async getLocation() {
    const graphcms = new GraphQLClient(
      "https://api-eu-central-1.graphcms.com/v2/ckpwkoq9vil5o01wk32cc5s39/master",
      {
        headers: {
          authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MjQ4NTc2NDIsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrcHdrb3E5dmlsNW8wMXdrMzJjYzVzMzkvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNDRkMjgxMTgtMmIyOS00ZDM4LTkwMzQtY2MxMWEzNzRiYzE1IiwianRpIjoiY2txZzZhZGFiOXdqYzAxejM0bjQ5NXFmaSJ9.QGrerKGZY31M_ohnyCTWCTYiZ9lG1Qfo64U0pmyEUFzmJAYNz8d_7P_7AXWc1PHQ7jzGsu7GMnnKLzxrDRBEptaiOwnAE9ed03G--okXIHnwjDUETjdqFXHfas3gEYRrGhyx_tFjLPGGkJQtJ-vUHGJO_928t2qMW1tz9P-Op3NvOBzcNj1MVWN2j9fZ2M_vd2x-ahp4ylEA-jzj_T4cOOyNmw_3izRkf1o8B0k65-U9MxZqe6FH0l4P0jli8VptNNnbSasNg9FbNXc73Tg1xQ2qRKVIAHJtL7pT8MtAzmlTaVdwk6mpKfvBfxqVaSUxSonqpAy5F7NZfY5RXDp1MNSZ3fiBD9p8qp46s6cwg274iPD3N9mFlzPSoCzQKQJTuUW-Pyi0pBFqt21dEzXb34vfGEgiNhsGu5ujG0fBbB--FkepEuyPTbcqZRM2wmjHbLZzNyAImqUkGYvETdHyNeTDkv9AUA8YkruaHNG1UEtKYt1a41RezMAoK6QIBKJz0EpdYuWqLcqn1KNH_wtCqJPTfTsHT5acCupzJlfwl0X_vNNoPNJGSjmuMoBvJBEh8kL6M0gY-pzbFpDLr2dVBiMdQxdYlDjSs_Sxx4qUDx8Gz6yYqDvRiNLdZ8JYlrraMH3GkENFg8hC9-MSJ8rkIWrhxr7cGd342VhOPu70YAU`,
        },
      }
    );
    const { eventLocations } = await graphcms.request(
      `{
        eventLocations {
          city
          id
        }
      }`
    );
    let lst = [];
    eventLocations.forEach((p) => {
      var temp = {};
      temp.name = p.city;
      temp.value = p.id;
      lst.push(temp);
    });
    return lst;
  }
}
export default new Service();
