import { GraphQLClient } from "graphql-request";

// eslint-disable-next-line
import SDPConverter from "components/converter-sdp/ConverterSDP";
class Service {
  constructor() {
    this.data = null;
    this.val = "";
  }
  async addData(data) {
    const graphcms = new GraphQLClient(
      "https://api-eu-central-1.graphcms.com/v2/ckpwkoq9vil5o01wk32cc5s39/master",
      {
        headers: {
          authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MjQ4NTc2NDIsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrcHdrb3E5dmlsNW8wMXdrMzJjYzVzMzkvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNDRkMjgxMTgtMmIyOS00ZDM4LTkwMzQtY2MxMWEzNzRiYzE1IiwianRpIjoiY2txZzZhZGFiOXdqYzAxejM0bjQ5NXFmaSJ9.QGrerKGZY31M_ohnyCTWCTYiZ9lG1Qfo64U0pmyEUFzmJAYNz8d_7P_7AXWc1PHQ7jzGsu7GMnnKLzxrDRBEptaiOwnAE9ed03G--okXIHnwjDUETjdqFXHfas3gEYRrGhyx_tFjLPGGkJQtJ-vUHGJO_928t2qMW1tz9P-Op3NvOBzcNj1MVWN2j9fZ2M_vd2x-ahp4ylEA-jzj_T4cOOyNmw_3izRkf1o8B0k65-U9MxZqe6FH0l4P0jli8VptNNnbSasNg9FbNXc73Tg1xQ2qRKVIAHJtL7pT8MtAzmlTaVdwk6mpKfvBfxqVaSUxSonqpAy5F7NZfY5RXDp1MNSZ3fiBD9p8qp46s6cwg274iPD3N9mFlzPSoCzQKQJTuUW-Pyi0pBFqt21dEzXb34vfGEgiNhsGu5ujG0fBbB--FkepEuyPTbcqZRM2wmjHbLZzNyAImqUkGYvETdHyNeTDkv9AUA8YkruaHNG1UEtKYt1a41RezMAoK6QIBKJz0EpdYuWqLcqn1KNH_wtCqJPTfTsHT5acCupzJlfwl0X_vNNoPNJGSjmuMoBvJBEh8kL6M0gY-pzbFpDLr2dVBiMdQxdYlDjSs_Sxx4qUDx8Gz6yYqDvRiNLdZ8JYlrraMH3GkENFg8hC9-MSJ8rkIWrhxr7cGd342VhOPu70YAU`,
        },
      }
    );
    if (data.location !== true) {
      const { createEventLocation } = await graphcms.request(
        `mutation eventLocation($data: EventLocationCreateInput!) {
        createEventLocation(data: $data){   id
        }
      }`,
        { data: { city: data.loc } }
      );
      await graphcms.request(
        `mutation ($ids: [ID!], $to: [Stage!]!) {
        publishManyEventLocationsConnection(where: {id_in: $ids}, to: $to){
            aggregate{count}
        }}`,
        { ids: [createEventLocation.id], to: ["PUBLISHED"] }
      );
      this.val=createEventLocation.id
    }

    const { createEventProfile } = await graphcms.request(
      `mutation ($data: EventProfileCreateInput!) {
        createEventProfile(data: $data){id}
      }`,
      {
        data: {
          eventTitle: data.title,
          eventDescription: data.desc,
          eventUrl: data.url,
          startDateTime: data.datetime.toISOString(),
          eventContactEmail: data.email,
          fromPhaseAutomated:
            data.from_A !== null ? SDPConverter.getPoint(data.from_A) : null,
          fromPhaseManual:
            data.from_M !== null ? SDPConverter.getPoint(data.from_M) : null,
          toPhaseAutomated:
            data.To_A !== null ? SDPConverter.getPoint(data.To_A) : null,
          toPhaseManual:
            data.To_M !== null ? SDPConverter.getPoint(data.To_M) : null,
          eventLocation: {
            connect: {
              id: data.location === true ? data.loc : this.val,
            },
          },
        },
      }
    );
    const res = await graphcms.request(
      `mutation ($ids: [ID!], $to: [Stage!]!) {
      publishManyEventProfilesConnection(where: {id_in: $ids}, to: $to){
            aggregate{count}
        }}`,
      { ids: [createEventProfile.id], to: ["PUBLISHED"] }
    );
    return res;
  }
  getISODate(data) {
    try {
      return data.datetime.toISOString();
    } catch (error) {
      return data.datetime;
    }
  }
  async updateProfile(data, idx) {
    ;
    const graphcms = new GraphQLClient(
      "https://api-eu-central-1.graphcms.com/v2/ckpwkoq9vil5o01wk32cc5s39/master",
      {
        headers: {
          authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MjQ4NTc2NDIsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrcHdrb3E5dmlsNW8wMXdrMzJjYzVzMzkvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNDRkMjgxMTgtMmIyOS00ZDM4LTkwMzQtY2MxMWEzNzRiYzE1IiwianRpIjoiY2txZzZhZGFiOXdqYzAxejM0bjQ5NXFmaSJ9.QGrerKGZY31M_ohnyCTWCTYiZ9lG1Qfo64U0pmyEUFzmJAYNz8d_7P_7AXWc1PHQ7jzGsu7GMnnKLzxrDRBEptaiOwnAE9ed03G--okXIHnwjDUETjdqFXHfas3gEYRrGhyx_tFjLPGGkJQtJ-vUHGJO_928t2qMW1tz9P-Op3NvOBzcNj1MVWN2j9fZ2M_vd2x-ahp4ylEA-jzj_T4cOOyNmw_3izRkf1o8B0k65-U9MxZqe6FH0l4P0jli8VptNNnbSasNg9FbNXc73Tg1xQ2qRKVIAHJtL7pT8MtAzmlTaVdwk6mpKfvBfxqVaSUxSonqpAy5F7NZfY5RXDp1MNSZ3fiBD9p8qp46s6cwg274iPD3N9mFlzPSoCzQKQJTuUW-Pyi0pBFqt21dEzXb34vfGEgiNhsGu5ujG0fBbB--FkepEuyPTbcqZRM2wmjHbLZzNyAImqUkGYvETdHyNeTDkv9AUA8YkruaHNG1UEtKYt1a41RezMAoK6QIBKJz0EpdYuWqLcqn1KNH_wtCqJPTfTsHT5acCupzJlfwl0X_vNNoPNJGSjmuMoBvJBEh8kL6M0gY-pzbFpDLr2dVBiMdQxdYlDjSs_Sxx4qUDx8Gz6yYqDvRiNLdZ8JYlrraMH3GkENFg8hC9-MSJ8rkIWrhxr7cGd342VhOPu70YAU`,
        },
      }
    );
    if (data.location !== true) {
      const { createEventLocation } = await graphcms.request(
        `mutation eventLocation($data: EventLocationCreateInput!) {
        createEventLocation(data: $data){   id
        }
      }`,
        { data: { city: data.loc } }
      );
      await graphcms.request(
        `mutation ($ids: [ID!], $to: [Stage!]!) {
        publishManyEventLocationsConnection(where: {id_in: $ids}, to: $to){
            aggregate{count}
        }}`,
        { ids: [createEventLocation.id], to: ["PUBLISHED"] }
      );
      this.val=createEventLocation.id
    }
    
    const { updateEventProfile } = await graphcms.request(
      `mutation ($data: EventProfileUpdateInput!) {  updateEventProfile(data:$data , where: {id: "${idx}"}) {    id  }}`,
      {
        data: {
          eventTitle: data.title,
          eventDescription: data.desc,
          eventUrl: data.url,
          eventContactEmail: data.email,
          fromPhaseAutomated:
            data.from_A !== null ? SDPConverter.getPoint(data.from_A) : null,
          fromPhaseManual:
            data.from_M !== null ? SDPConverter.getPoint(data.from_M) : null,
          toPhaseAutomated:
            data.To_A !== null ? SDPConverter.getPoint(data.To_A) : null,
          toPhaseManual:
            data.To_M !== null ? SDPConverter.getPoint(data.To_M) : null,

          eventLocation: {
            connect: {
              id: data.location === true ? data.city_id : this.val,
            },
          },
        },
      }
    );
    const res = await graphcms.request(
      `mutation ($ids: [ID!], $to: [Stage!]!) {
      publishManyEventProfilesConnection(where: {id_in: $ids}, to: $to){
            aggregate{count}
        }}`,
      { ids: [updateEventProfile.id], to: ["PUBLISHED"] }
    );

    return res;
  }

  async addImage(data) {
    const formData = new FormData();
    formData.append(
      "myFile",
      data,
      data.name
    );

    console.log(formData);

    fetch(`https://api-eu-central-1.graphcms.com/v2/ckpwkoq9vil5o01wk32cc5s39/master/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MjQ4NTc2NDIsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrcHdrb3E5dmlsNW8wMXdrMzJjYzVzMzkvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNDRkMjgxMTgtMmIyOS00ZDM4LTkwMzQtY2MxMWEzNzRiYzE1IiwianRpIjoiY2txZzZhZGFiOXdqYzAxejM0bjQ5NXFmaSJ9.QGrerKGZY31M_ohnyCTWCTYiZ9lG1Qfo64U0pmyEUFzmJAYNz8d_7P_7AXWc1PHQ7jzGsu7GMnnKLzxrDRBEptaiOwnAE9ed03G--okXIHnwjDUETjdqFXHfas3gEYRrGhyx_tFjLPGGkJQtJ-vUHGJO_928t2qMW1tz9P-Op3NvOBzcNj1MVWN2j9fZ2M_vd2x-ahp4ylEA-jzj_T4cOOyNmw_3izRkf1o8B0k65-U9MxZqe6FH0l4P0jli8VptNNnbSasNg9FbNXc73Tg1xQ2qRKVIAHJtL7pT8MtAzmlTaVdwk6mpKfvBfxqVaSUxSonqpAy5F7NZfY5RXDp1MNSZ3fiBD9p8qp46s6cwg274iPD3N9mFlzPSoCzQKQJTuUW-Pyi0pBFqt21dEzXb34vfGEgiNhsGu5ujG0fBbB--FkepEuyPTbcqZRM2wmjHbLZzNyAImqUkGYvETdHyNeTDkv9AUA8YkruaHNG1UEtKYt1a41RezMAoK6QIBKJz0EpdYuWqLcqn1KNH_wtCqJPTfTsHT5acCupzJlfwl0X_vNNoPNJGSjmuMoBvJBEh8kL6M0gY-pzbFpDLr2dVBiMdQxdYlDjSs_Sxx4qUDx8Gz6yYqDvRiNLdZ8JYlrraMH3GkENFg8hC9-MSJ8rkIWrhxr7cGd342VhOPu70YAU`,
      },
      body: formData,
    }).then((res) => {
      ;
    });
  }
}
export default new Service();
