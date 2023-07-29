"use strict";
describe("module:email-gateway", function () {
	it("ticket.set_reply_notified should set date on the correct reply", function () {
		spyOn(Tickets, "insert").and.callFake(function(doc, callback) {
			// simulate async return of id = "1"
			callback(null, "1");
		});
		spyOn(Tickets, "update");
		spyOn(Random, 'id').and.returnValue('1234ABCD');

		var now = new Date();

		// Stub user
		var user = {
			_id: "STUB1234",
			profile: {
				email : "stubuser@email.address",
				isStaff: true
			}
		};

		var ticket = new Ticket(
			null,
			now,
			now,
			null,
			"Ticket 1",
			"new",
			["r1234"],
			["gr1234"],
			[
				{
					_id: "reply0",
					body: "test",
					created: now,
					level: "requester",
					posted_by: "r1234",
					status: "posted",
					type: "reply"
				},
				{
					_id: "reply1",
					body: "test",
					created: now,
					level: "requester",
					posted_by: "r1234",
					status: "posted",
					type: "reply"
				},
				{
					_id: "reply2",
					body: "test",
					created: now,
					level: "requester",
					posted_by: "r1234",
					status: "posted",
					type: "reply"
				}
			],
			true,
			[]
		);
		ticket.insert();

		expect(ticket.replies.length).toEqual(3);
		ticket.set_reply_notified('reply1');
		expect(ticket.replies[0].notified).toEqual(undefined);
		expect(ticket.replies[1].notified).not.toEqual(undefined);
		expect(ticket.replies[2].notified).toEqual(undefined);
		expect(Tickets.update).toHaveBeenCalled();
	});

});
