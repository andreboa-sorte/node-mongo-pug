$(function () {

    /** Carrega os dados do MongoDB e exibe em uma tabela em HTML **/
    $("#fetchdata").on('click', function () {
        $.get("/fetchdata", function (data) {
            var produto = data['data'];
            $("#trdata").html('');
            $("#message").hide();
            var string = '';
            $.each(produto, function (index, produto) {
                string += '<tr><td>' + (index + 1) + '</td><td>' +produto['_id'] + '</td><td>' + 
                produto['distance'] + '</td><td>' + produto['consume'] + '</td><td>' + produto['speed'] +
                 '</td><td>' + produto['temp_inside'] + '</td><td>' + produto['temp_outside'] + '</td><td>' + 
                 produto['specials'] + '</td><td align="center"><a href="/edit/' + produto['_id'] + '" id="editdata" class="btn btn-default">'
                + '<span class="fa fa-pencil" aria-hidden="true"></span><span><strong>Editar</strong></span></a>'
                + '<a href="/delete/' + produto['_id'] + '" id="deletedata" class="btn btn-danger"><span class="fa fa-trash" aria-hidden="true">'
                + '</span><span><strong>Excluir</strong></span></a></tr>';
            });
            $("#trdata").html(string);
        });
    });
    /** Importa os dados para o MongoDB **/
    $("#importdata").on('click', function () {
        $.get("/import", function (data) {
            $("#message").show().html(data['success']);
        });
    })
    $("#deletedata").on('click', function () {
        $.get("/delete", function (data) {
            $("#message").show().html(data['success']);
        });
    })
    $("#editdata").on('click', function () {
        $.get("/edit", function (data) {
            $("#message").show().html(data['success']);
        });
    })
   
});

