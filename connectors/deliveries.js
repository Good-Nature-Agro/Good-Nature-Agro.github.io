(function () {
  // Create the connector object
  var farmerDetailsConnector = tableau.makeConnector();

  // Define the schema for the farmer details data
  farmerDetailsConnector.getSchema = function (schemaCallback) {
    var cols = [
      {
        id: "loan_id",
        alias: "Loan ID",
        dataType: tableau.dataTypeEnum.int,
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
        id: "package_name",
        alias: "Package Name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "items_not_delivered",
        alias: "Items Not Delivered",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "all_items_delivered",
        alias: "All Items Delivered",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "package_collected_by_farmer",
        alias: "Package Collected by Farmer",
        dataType: tableau.dataTypeEnum.string,
      },
    ];

    var tableSchema = {
      id: "farmerDetailsConnector",
      alias: "Input Deliveries",
      columns: cols,
    };

    schemaCallback([tableSchema]);
  };

  // Fetch and process the farmer details data
  farmerDetailsConnector.getData = function (table, doneCallback) {
    var apiKey = "in2th3GNAweb";
    $.ajax({
      url: `https://api.goodnatureagro.com/fe/loans/input-deliveries`,
      headers: {
        "x-api-key": apiKey,
      },
      dataType: "json",
      success: function (resp) {
        var feat = resp,
          tableData = [];

        for (var i = 0, len = feat.length; i < len; i++) {
          var package_inputs = feat[i].package_inputs || []; // Handle the case where package_inputs array is undefined

          for (var j = 0; j < package_inputs.length; j++) {
            var packageInputsDetails = package_inputs[j];

            tableData.push({
              loan_id: feat[i].loan_id,
              farmer_id: feat[i].farmer_id,
              farmer_name: feat[i].farmer_name,
              package_name: feat[i].package_name,
              package_collected_by_farmer: feat[i].package_collected_by_farmer,
              all_items_delivered: feat[i].all_items_delivered,
              items_not_delivered: feat[i].items_not_delivered,
              input_name: packageInputsDetails.name,
              input_quant: parseFloat(packageInputsDetails.quant),
              input_price: parseFloat(packageInputsDetails.price),
            });
          }

          if (package_inputs.length === 0) {
            tableData.push({
                loan_id: feat[i].loan_id,
                farmer_id: feat[i].farmer_id,
                farmer_name: feat[i].farmer_name,
                package_name: feat[i].package_name,
                package_collected_by_farmer: feat[i].package_collected_by_farmer,
                all_items_delivered: feat[i].all_items_delivered,
                items_not_delivered: feat[i].items_not_delivered
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

  tableau.registerConnector(farmerDetailsConnector);

  // Create event listeners for when the user submits the form
  $(document).ready(function () {
    $("#submitButton").click(function () {
      tableau.connectionName = "Input Deliveries";
      tableau.submit();
    });
  });
})();
