(function () {
  // Create the connector object
  var plantAndGermConnector = tableau.makeConnector();

  // Define the schema for your loan data
  plantAndGermConnector.getSchema = function (schemaCallback) {

    var cols = [
      {
        id: "loan_id",
        alias: "Loan ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "package_name",
        alias: "Package Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "farmer_id",
        alias: "Farmer ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "farmer_name",
        alias: "Farmer Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "region",
        alias: "Region",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "district_name",
        alias: "District Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "camp_name",
        alias: "Camp Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "group_name",
        alias: "Group Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "team_name",
        alias: "Team Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "pea_name",
        alias: "PEA Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "fs_name",
        alias: "FS Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "lfs_name",
        alias: "LFS Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "form_id",
        alias: "Form ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "formName",
        alias: "Survey Form Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "submission_id",
        alias: "Submission ID",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "created_at",
        alias: "Creation Date",
        dataType: tableau.dataTypeEnum.date,
      },
      {
        id: "planting_start_date",
        alias: "Planting Start Date",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "planting_end_date",
        alias: "Planting End Date",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "spacing_in_centimetres",
        alias: "Spacing in Centimetres",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "multiple_seeds_per_hole",
        alias: "Did Farmer plant multiple seeds per hole?",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "row_1_number_of_plants",
        alias: "Row 1 Number of plants seen in that meter",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "row_2_number_of_plants",
        alias: "Row 2 Number of plants seen in that meter",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "row_3_number_of_plants",
        alias: "Row 3 Number of plants seen in that meter",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "row_4_number_of_plants",
        alias: "Row 4 Number of plants seen in that meter",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "row_5_number_of_plants",
        alias: "Row 5 Number of plants seen in that meter",
        dataType: tableau.dataTypeEnum.int,
      },
      {
        id: "did_farmer_receive_training",
        alias: "Did Farmer receive training on how to grow this crop?",
        dataType: tableau.dataTypeEnum.string,
      },
    ];

    var tableSchema = {
      id: "plantAndGermConnector",
      alias: "Plant and Germ Tracker",
      columns: cols,
    };

    schemaCallback([tableSchema]);
  };

  // Fetch and process the loan data
  plantAndGermConnector.getData = function (table, doneCallback) {
    var apiKey = "in2th3GNAweb"; // Replace with your API key
    var formID = 31;

    $.ajax({
      url: `https://api.goodnatureagro.com/fe/surveys/loans/${formID}`,
      headers: {
        "x-api-key": apiKey,
      },
      dataType: "json",
      success: function (resp) {
        var feat = resp;
        var tableData = [];

        for (var i = 0, len = feat.length; i < len; i++) {
          var surveys = feat[i].surveys || [];

          for (var j = 0; j < surveys.length; j++) {
            var surveyDetails = surveys[j];

            //initialize answer variables
            var questionOneAnswer = "Not Answered";
            var questionTwoAnswer = "Not Answered";
            var questionThreeAnswer = "Not Answered";
            var questionFourAnswer = "Not Answered";
            var questionFiveAnswer = "Not Answered";
            var questionSixAnswer = "Not Answered";
            var questionSevenAnswer = "Not Answered";
            var questionEightAnswer = "Not Answered";
            var questionNineAnswer = "Not Answered";
            var questionTenAnswer = "Not Answered";

            // Loop through the answers and update the variables
            for (var k = 0; k < surveyDetails.answers.length; k++) {
              var answer = surveyDetails.answers[k];
              var position = k + 1; // Position starts from 1

              // Check if the answer array exists and is not null before accessing its elements
              if (answer.answer && answer.answer.length > 0) {
                // Extract the numeric part from the question text
                var questionNumber = parseInt(answer.question.match(/\d+/)[0]);

                // Assign answers to corresponding variables based on the numeric part
                switch (questionNumber) {
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
                  case 6:
                    questionFiveAnswer = answer.answer[0];
                    break;
                  case 8:
                    questionSixAnswer = answer.answer[0];
                    break;
                  case 10:
                    questionSevenAnswer = answer.answer[0];
                    break;
                  case 12:
                    questionEightAnswer = answer.answer[0];
                    break;
                  case 14:
                    questionNineAnswer = answer.answer[0];
                    break;
                  case 15:
                    questionTenAnswer = answer.answer[0];
                    break;
                  default:
                    break;
                }
              } else {
                // If the answer array is null or empty, set the corresponding variable to "Not Answered"
                switch (position) {
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
                  case 7:
                    questionSevenAnswer = "Not Answered";
                    break;
                  case 8:
                    questionEightAnswer = "Not Answered";
                    break;
                  case 9:
                    questionNineAnswer = "Not Answered";
                    break;
                  case 10:
                    questionTenAnswer = "Not Answered";
                    break;
                  default:
                    break;
                }
              }
            }

    

            tableData.push({
              loan_id: feat[i].loan_id,
              package_name: feat[i].package_name,
              farmer_id: feat[i].farmer_id,
              farmer_name: feat[i].farmer_name,
              region: feat[i].region,
              district_name: feat[i].district_name,
              camp_name: feat[i].camp_name,
              group_name: feat[i].group_name,
              team_name: feat[i].team_name,
              pea_name: feat[i].pea_name,
              fs_name: feat[i].fs_name,
              lfs_name: feat[i].lfs_name,
              form_id: surveyDetails.formId,
              formName: surveyDetails.formName,
              submission_id: surveyDetails.SubmissionId,
              created_at: surveyDetails.created_at,
              planting_start_date: questionOneAnswer,
              planting_end_date: questionTwoAnswer,
              spacing_in_centimetres: questionThreeAnswer,
              multiple_seeds_per_hole: questionFourAnswer,
              row_1_number_of_plants: questionFiveAnswer,
              row_2_number_of_plants: questionSixAnswer,
              row_3_number_of_plants: questionSevenAnswer,
              row_4_number_of_plants: questionEightAnswer,
              row_5_number_of_plants: questionNineAnswer,
              did_farmer_receive_training: questionTenAnswer,
            });
          }

          if (surveys.length == 0) {
            tableData.push({
              loan_id: feat[i].loan_id,
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

  tableau.registerConnector(plantAndGermConnector);

  // Create event listeners for when the user submits the form
  $(document).ready(function () {
    $("#submitButton").click(function () {
      tableau.connectionName = "Planting & Germination Data";
      tableau.submit();
    });
  });
})();
