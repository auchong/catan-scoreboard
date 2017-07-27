$(function(){

    $('.player-image').on('dblclick', function(e){
        e.preventDefault();

        var playerID = $(this).attr('data-id');
        var data = {id: playerID, player: {}};

        $.ajax({
            method: "PUT",
            url: "/player/update",
            data: data,
            dataType: 'application/json',
            success: window.location.href="/",
            failure: console.log('Error')
        })
    });


})
