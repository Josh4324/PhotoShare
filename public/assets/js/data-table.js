$(function() {
    'use strict';

    $(function() {
        $('#dataTableExample').DataTable({
            /* Disable initial sort */
            "order": [],

            "aLengthMenu": [
                [25, 50, -1],
                [25, 50, "All"]
            ],
            "iDisplayLength": 25,
            "language": {
                search: ""
            }
        });
        $('#dataTableExample').each(function() {
            var datatable = $(this);
            // SEARCH - Add the placeholder for Search and Turn this into in-line form control
            var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
            search_input.attr('placeholder', 'Search');
            search_input.removeClass('form-control-sm');
            // LENGTH - Inline-Form control
            var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
            length_sel.removeClass('form-control-sm');
        });

        $('#dataTable2').DataTable({
            /* Disable initial sort */
            "order": [],

            "aLengthMenu": [
                [5, 10, -1],
                [5, 10, "All"]
            ],
            "iDisplayLength": 5,
            "language": {
                search: ""
            }
        });
        $('#dataTable2').each(function() {
            var datatable = $(this);
            // SEARCH - Add the placeholder for Search and Turn this into in-line form control
            var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
            search_input.attr('placeholder', 'Search');
            search_input.removeClass('form-control-sm');
            // LENGTH - Inline-Form control
            var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
            length_sel.removeClass('form-control-sm');
        });
    });

});