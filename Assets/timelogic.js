
    var config = {
        apiKey: "AIzaSyDDIxR838DFxz_4a2a1wdJoa91x5HNHBCA",
        authDomain: "train-time-299c0.firebaseapp.com",
        databaseURL: "https://train-time-299c0.firebaseio.com",
        projectId: "train-time-299c0",
        storageBucket: "train-time-299c0.appspot.com",
        messagingSenderId: "748184779017"
    };
        firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = $("#first-train-input").val().trim();
        var frequency = $("#rate-input").val().trim();

        var newTrain = {
        trainName,
        destination,
        firstTrain,
        frequency,
        };

        database.ref().push(newTrain);
        console.log(newTrain);

        alert("Train added!!");

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#rate-input").val("");
    });

    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val())

        var trainName = (childSnapshot.val().trainName);
        var destination = (childSnapshot.val().destination);
        var firstTrain = (childSnapshot.val().firstTrain);
        var frequency = (childSnapshot.val().frequency);


        var timeCovert = moment(firstTrain, "hh:mm").subtract(1 , "years");

        var currentTime = moment();

        var timeDiff = moment().diff(moment(timeCovert), "minutes");

        var timeRemaining = timeDiff % frequency;

        var minutesToNext = frequency - timeRemaining;

        var nextTrain = moment().add(minutesToNext, "minutes");

        var nextArrival = moment(nextTrain).format("hh:mm");
        console.log(nextArrival);


        $('#first-train-input').html(moment().format("hh:mm"));

        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minutesToNext)
        );

        $("#train-table > tbody").append(newRow);

    });
