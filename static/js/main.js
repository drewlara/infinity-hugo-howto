function groupBy(arr, n) {
    var group = [];
    for (var i = 0, end = arr.length / n; i < end; ++i)
      group.push(arr.slice(i * n, (i + 1) * n));
    return group;
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
}

function renderEventThumb(events) {
    return events.map(event => (
        `<div class="event-thumbnail wow fadeInLeft">
            <img src="${event.logo.url}" alt="event-img-${event.name.text}"/>
            <div class="event-thumbnail-caption">
                <p class="event-thumbnail-title"><strong>${event.name.text}</strong></p>
                <p class="event-thumbnail-date">${formatDate(event.start.local)}</p>
            </div>
            <p class="event-thumbnail-subcap">
                <strong><a class="view-event" target="_blank" href="${event.url}">View Event</a></strong>
            </p>
        </div>`
    ));
};

function renderEventGrid(events) {
    const eventThumbArr = groupBy(renderEventThumb(events), 3);
    const eventGridArr = eventThumbArr.map(eventGroup => {
        eventGroup = ['<div class="event-grid">', ...eventGroup];
        eventGroup.push('</div>');
        eventGroup.join('')
        return eventGroup;
    });
    return eventGridArr.map(arr => arr.join(''));
};

$(document).ready(function(){


     new WOW().init();


     $('#top-nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 1200
    });

     
    //animated header class
    $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
     //console.log(scroll);
    if (scroll > 200) {
        //console.log('a');
        $(".navigation").addClass("animated");
    } else {
        //console.log('a');
        $(".navigation").removeClass("animated");
    }});

    $(".about-slider").owlCarousel(
        {
        singleItem: true,
        pagination : true,
        autoPlay : 2000,
        }
    );

    $.ajax({
        type: "GET",
        url: "https://www.eventbriteapi.com/v3/users/me/events/?token=MKMRNJ6E6I3JTYPCN6II&time_filter=current_future",
        dataType: "json"
    })
    .done(function(data) {
        const displayedEvents = renderEventGrid(data.events);
        $('.lds-ring').hide();
        $('#events').html(displayedEvents);
    });
});







