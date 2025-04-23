$(window).on('scroll', parallaxScroll);

function parallaxScroll() {
    const scrolled = $(window).scrollTop();

    const layers = [
        { selector: '.layer-1', speed: 0.25 },
        { selector: '.layer-2', speed: 0.5 },
        { selector: '.layer-3', speed: 0.75 },
        { selector: '.layer-4', speed: 1 },
        { selector: '.layer-5', speed: 1.25 },
        { selector: '.layer-6', speed: 1.5 },
        { selector: '.layer-7', speed: 0.5 },
        { selector: '.layer-8', speed: 0.75 },
        { selector: '.layer-9', speed: 1 }
    ];

    layers.forEach(layer => {
        $(layer.selector).css('top', `${-scrolled * layer.speed}px`);
    });

    const rocks = [
        { selector: '.rock-1', baseTop: 400, speed: 0.8 },
        { selector: '.rock-2', baseTop: 200, speed: 0.6 },
        { selector: '.rock-3', baseTop: 500, speed: 0.4 },
        { selector: '.rock-4', baseTop: 600, speed: 0.5 },
        { selector: '.rock-6', baseTop: 400, speed: 0.7 },
        { selector: '.rock-8', baseTop: 200, speed: 0.2 },
        { selector: '.rock-9', baseTop: 200, speed: 0.4 }
    ];

    rocks.forEach(rock => {
        $(rock.selector).css('top', `${rock.baseTop - scrolled * rock.speed}px`);
    });
}
