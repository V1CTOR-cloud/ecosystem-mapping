class MockData {
	constructor() {
		this.data = {
			eventProfiles: [
				{
					eventOrganiser: {
						eventorganiserName: "Techstars",
					},
					eventImage: {
						url: "https://media.graphcms.com/46uoMPdSTriiWs4Lf3nC",
					},
					startDateTime: "2021-02-26T13:00:00+00:00",
					eventTitle: "Startup Weekend Education Hanoi",
					eventLocation: {
						city: "Hanoi",
					},
					eventDescription:
						"In just 54 hours, you will experience the highs, lows, fun, and pressure that make up life at a startup. As you learn how to create a real company, you'll meet the very best mentors, investors, cofounders, and sponsors who are ready to help you get started.",
				},
			],
		};
	}

	getdata() {
		return this.data;
	}
}
export default new MockData();
