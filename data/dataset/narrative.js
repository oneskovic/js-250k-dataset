ig.module(
    'plusplus.entities.narrative'
)
    .requires(
        'plusplus.entities.conversation',
        'plusplus.ui.ui-text-box'
)
    .defines(function() {

        
        ig.EntityNarrative = ig.global.EntityNarrative = ig.EntityConversation.extend( /**@lends ig.EntityNarrative.prototype */ {

            /**
             * @override
             */
            messageContainerEntity: ig.UITextBox,

            /**
             * @override
             */
            messageSettings: {
                posPct: {
                    x: 0.5,
                    y: 0.25
                },
                align: {
                    x: 0.5,
                    y: 0
                },
                linkAlign: {
                    x: 0.5,
                    y: 0
                }
            },

            /**
             * @override
             * @default
             */
            messageFollowsSpeaker: false,

            /**
             * @override
             */
            messageMoveToSettings: {
                matchPerformance: true,
                offsetPct: {
                    x: 0,
                    y: 2
                }
            }

        });

    });
