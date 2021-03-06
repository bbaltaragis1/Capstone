

function get_Patients(last_name) {
    //console.log(last_name);
    
    var radio_button_id = document.getElementById("search_type_id");
    if (radio_button_id.checked) {
        $.ajax({
            url: "/get_patients_by_id",
            data: {
                last_name: last_name
            },
            success: function( result ) {
                $( "#patients" ).html( "<strong>" + result + "</strong> " );
            }
        });  
    }
    else{
        $.ajax({
            url: "/get_patients_by_last_name",
            data: {
                last_name: last_name
            },
            success: function( result ) {
                $( "#patients" ).html( "<strong>" + result + "</strong> " );
            }
        });  
    }    
  }

function get_patient(patient_id) {
    console.log(patient_id);
    
    $.ajax({
        url: "/get_patient",
        data: {
        patient_id: patient_id
        },
        success: function( result ) {
        $( "#patient_info" ).html(  result );
        }
    });
}

function edit_patient(patient_id) {
    console.log(patient_id+"edit");
    
    $.ajax({
        url: "/edit_patient",
        data: {
        patient_id: patient_id
        },
        success: function( result ) {
        $( "#patient_info" ).html(  result );
        }
    });
}

function get_app_by_id(app_id) {
    console.log(app_id);

    $.ajax({
        url: "/get_app_by_id",
        data: {
        app_id: app_id
        },
        success: function( result ) {
        $( "#modal" ).html(  result );
        $('#modalBox').modal('show');
        }
    });
}

function modalAdd(){
    $.ajax({
        url: "/calendar/add_event",
        success: function( result ) {
            $( "#modal_add" ).html(  result );
            $('#modal_edit').modal('show');
        }
    });
}

function add_fields() {
    var d = document.getElementById("table_body");
   
    d.innerHTML += "<tr>"+
                        "<td>Insurer:</td>"+
                        "<td>"+
                            "<input placeholder='Type' name='company_name' type='text' />"+
                        "</td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td>Name:</td>"+
                        "<td>"+
                            "<input placeholder='Name' name='insurance_number' type='text'/>"+
                        "</td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td>Name:</td>"+
                        "<td>"+
                            "<input placeholder='Description' name='insurance_number' type='text'/>"+
                        "</td>"+
                    "</tr>";
                    
 }


(function($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);
