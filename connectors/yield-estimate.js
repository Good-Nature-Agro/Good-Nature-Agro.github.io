(function () {
    // Create the connector object
    var yieldEstimateConnector = tableau.makeConnector();

    // Define the schema for your loan data
    yieldEstimateConnector.getSchema = function (schemaCallback) {

        var cols = cols = [
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
                id: "1",
                alias: "Crop Variety",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "2",
                alias: "How many rows are there on the 10m stretch of land?",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "3",
                alias: "How many plants are there in the FIRST 5m row?",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "4",
                alias: "How many plants are there in the SECOND 5m row?",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "5",
                alias: "How many pods are there in the two plants? Station 1",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "6",
                alias: "How many seeds are there in the five selected pods? Station 1",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "7",
                alias: "How many pods are there in the two plants? Station 2",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "8",
                alias: "How many seeds are there in the five selected pods? Station 2",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "9",
                alias: "How many pods are there in the two plants? Station 3",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "10",
                alias: "How many seeds are there in the five selected pods? Station 3",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "11",
                alias: "How many pods are there in the two plants? Station 4",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "12",
                alias: "How many seeds are there in the five selected pods? Station 4",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "13",
                alias: "How many pods are there in the two plants? Station 5",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "14",
                alias: "How many seeds are there in the five selected pods? Station 5",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "15",
                alias: "How many pods are there in the two plants? Station 6",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "16",
                alias: "How many seeds are there in the five selected pods? Station 6",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "17",
                alias: "How many pods are there in the two plants? Station 7",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "18",
                alias: "How many seeds are there in the five selected pods? Station 7",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "19",
                alias: "How many pods are there in the two plants? Station 8",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "20",
                alias: "How many seeds are there in the five selected pods? Station 8",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "21",
                alias: "How many pods are there in the two plants? Station 9",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "22",
                alias: "How many seeds are there in the five selected pods? Station 9",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "23",
                alias: "How many pods are there in the two plants? Station 10",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "24",
                alias: "How many seeds are there in the five selected pods? Station 10",
                dataType: tableau.dataTypeEnum.int,
            }

        ];

        var tableSchema = {
            id: "yieldEstimateConnector",
            alias: "Yield Estimate Tracker",
            columns: cols,
        };

        schemaCallback([tableSchema]);
    };

    // Fetch and process the loan data
    yieldEstimateConnector.getData = function (table, doneCallback) {
        var apiKey = "in2th3GNAweb"; // Replace with your API key
        var formID = 35;

        $.ajax({
            url: `https://api.goodnatureagro.com/fe/surveys/loans/${formID}`,
            headers: {
                "x-api-key": apiKey,
            },
            dataType: "json",
            success: function (resp) {
                var feat = resp;
                var tableData = [];

                feat.forEach(function (resp) {
                    resp.surveys.forEach(function (survey) {
                        var rowData = {
                            farmer_id: resp.farmer_id,
                            farmer_name: resp.farmer_name,
                            region: resp.region,
                            district_name: resp.district_name,
                            camp_name: resp.camp_name,
                            group_name: resp.group_name,
                            team_name: resp.team_name,
                            pea_name: resp.pea_name,
                            fs_name: resp.fs_name,
                            lfs_name: resp.lfs_name,
                            form_id: survey.formId,
                            formName: survey.formName,
                            submission_id: survey.SubmissionId,
                            created_at: survey.created_at,
                        };

                        survey.answers.forEach(function (answer) {

                            var columnName = answer.question.replace(/[^\w\s]/gi, ''); // Remove special characters
                            var questionNumber = parseInt(answer.question.match(/\d+/)[0]);
                            if (answer.answer && answer.answer.length > 0) {
                                rowData[questionNumber] = answer.answer[0]; // Assuming answers are numeric
                            } else {
                                rowData[questionNumber] = null; // Or handle as needed
                            }
                        });

                        tableData.push(rowData);
                    });
                });

                table.appendRows(tableData);
                doneCallback();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error: " + textStatus, errorThrown);
                doneCallback();
            },
        });
    };

    tableau.registerConnector(yieldEstimateConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Yield Estimates";
            tableau.submit();
        });
    });
})();
