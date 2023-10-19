(function () {
  // Create the connector object
  var surveyConnector = tableau.makeConnector();

  // Define the schema for your survey data
  surveyConnector.getSchema = function (schemaCallback) {
    var cols = [
      {
        id: "farmer_id",
        alias: "Farmer ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "formName",
        alias: "Survey Form Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "created_at",
        alias: "Creation Date",
        dataType: tableau.dataTypeEnum.date,
      },
      {
        id: "activity_type",
        alias: "Activity Type",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "meeting_with",
        alias: "Meeting With?",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "location",
        alias: "Location",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "number_of_people",
        alias: "Number Of People",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "general_comments",
        alias: "General Comments",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "next_steps",
        alias: "Next Steps",
        dataType: tableau.dataTypeEnum.string,
      },
    ];

    var tableSchema = {
      id: "activityTracker",
      alias: "Activity Tracker Data",
      columns: cols,
    };

    schemaCallback([tableSchema]);
  };

  // Fetch and process the survey data
  surveyConnector.getData = function (table, doneCallback) {
    var apiKey = "in2th3GNAweb";
    var formId = 24;

    $.ajax({
      url: `https://api.goodnatureagro.com/fe/farmers/surveys/${formId}`,
      headers: {
        "x-api-key": apiKey,
      },
      dataType: "json",
      success: function (resp) {
        var feat = resp;
        var tableData = [];

        for (var i = 0, len = feat.length; i < len; i++) {
          var surveys = feat[i].surveys || []; // Handle the case where surveys array is undefined

          for (var j = 0; j < surveys.length; j++) {
            var surveyDetails = surveys[j];

            // Initialize answer variables
            var questionOneAnswer = "Not Answered";
            var questionTwoAnswer = "Not Answered";
            var questionThreeAnswer = "Not Answered";
            var questionFourAnswer = "Not Answered";
            var questionFiveAnswer = "Not Answered";
            var questionSixAnswer = "Not Answered";

            // Loop through survey answers and update variables
            for (var k = 0; k < surveyDetails.answers.length; k++) {
              var answer = surveyDetails.answers[k];

              // Check if the answer array exists and is not null before accessing its elements
              if (answer.answer && answer.answer.length > 0) {
                var position = k + 1; // Position starts from 1

                // Assign answers to corresponding variables based on position
                switch (position) {
                  case 1:
                    questionOneAnswer = answer.answer[0];
                    break;
                  case 2:
                    questionTwoAnswer = answer.answer[0];
                    break;
                  case 3:
                    questionThreeAnswer = answer.answer[0];
                    break;
                  case 4:
                    questionFourAnswer = answer.answer[0];
                    break;
                  case 5:
                    questionFiveAnswer = answer.answer[0];
                    break;
                  case 6:
                    questionSixAnswer = answer.answer[0];
                    break;
                  default:
                    // Handle additional positions as needed
                    break;
                }
              } else {
                // If the answer array is null or empty, set the corresponding variable to "Not Answered"
                switch (k + 1) {
                  case 1:
                    questionOneAnswer = "Not Answered";
                    break;
                  case 2:
                    questionTwoAnswer = "Not Answered";
                    break;
                  case 3:
                    questionThreeAnswer = "Not Answered";
                    break;
                  case 4:
                    questionFourAnswer = "Not Answered";
                    break;
                  case 5:
                    questionFiveAnswer = "Not Answered";
                    break;
                  case 6:
                    questionSixAnswer = "Not Answered";
                    break;
                  default:
                    // Handle additional positions as needed
                    break;
                }
              }
            }

            tableData.push({
              farmer_id: feat[i].farmer_id,
              formName: surveyDetails.formName,
              created_at: surveyDetails.created_at,
              activity_type: questionOneAnswer,
              meeting_with: questionTwoAnswer,
              location: questionThreeAnswer,
              number_of_people: questionFourAnswer,
              general_comments: questionFiveAnswer,
              next_steps: questionSixAnswer,
            });
          }

          if (surveys.length == 0) {
            tableData.push({
              farmer_id: feat[i].farmer_id,
            });
          }
        }

        table.appendRows(tableData);
        doneCallback();
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Error: " + textStatus, errorThrown);
        doneCallback();
      },
    });
  };

  tableau.registerConnector(surveyConnector);

  // Create event listeners for when the user submits the form
  $(document).ready(function () {
    $("#submitButton").click(function () {
      tableau.connectionName = "Survey Data";
      tableau.submit();
    });
  });
})();
