$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            $.ajax({
                url: "/assets/mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message,
                },
                cache: false,
                success: function (response) {
                    const res = JSON.parse(response);
                    if (res.status === "success") {
                        $("#success").html("<div class='alert alert-success'>");
                        $("#success > .alert-success")
                            .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                            .append("<strong>Your message has been sent. </strong>")
                            .append("</div>");
                        $("#contactForm").trigger("reset");
                    } else {
                        $("#success").html("<div class='alert alert-danger'>");
                        $("#success > .alert-danger")
                            .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                            .append($("<strong>").text("Error: " + res.message));
                        $("#success > .alert-danger").append("</div>");
                        $("#contactForm").trigger("reset");
                    }
                },
                error: function (xhr, status, error) {
                    $("#success").html("<div class='alert alert-danger'>");
                    $("#success > .alert-danger")
                        .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                        .append($("<strong>").text("AJAX error: " + error));
                    $("#success > .alert-danger").append("</div>");
                    $("#contactForm").trigger("reset");
                },

                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});
