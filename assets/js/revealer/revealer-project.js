setTimeout(function(){
    $('.flexy').removeClass('delay-loading')
},100);

(function() {
	// Fake loading.
	setTimeout(init, 100);

	function init() {

		//************************ Example 1 - reveal on load ********************************
		
		var rev1 = new RevealFx(document.querySelector('#rev-1'), {
			revealSettings : {
				bgcolor: '#D4EA01',
				onCover: function(contentEl, revealerEl) {
					contentEl.style.opacity = 1;
				}
			}
		});
		rev1.reveal();

		var rev2 = new RevealFx(document.querySelector('#rev-2'), {
			revealSettings : {
				bgcolor: '#fff',
				delay: 500,
				direction: 'rl',
				onCover: function(contentEl, revealerEl) {
					contentEl.style.opacity = 1;
				}
			}
		});
		rev2.reveal();

		//************************ Example 2 - reveal on scroll ********************************
		
		var scrollElemToWatch_1 = document.getElementById('rev-3'),
			watcher_1 = scrollMonitor.create(scrollElemToWatch_1, -300),				
			rev3 = new RevealFx(scrollElemToWatch_1, {
				revealSettings : {
					bgcolor: '#D4EA01',
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),
			rev4 = new RevealFx(document.querySelector('#rev-4'), {
				revealSettings : {
					bgcolor: '#fff',
					delay: 250,
					direction: 'rl',
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			});

		watcher_1.enterViewport(function() {
			rev3.reveal();
			rev4.reveal();
			watcher_1.destroy();
		});

		var scrollElemToWatch_2 = document.getElementById('rev-5'),
			watcher_2 = scrollMonitor.create(scrollElemToWatch_2, -300),				
			rev5 = new RevealFx(scrollElemToWatch_2, {
				revealSettings : {
					bgcolor: '#D4EA01',
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),
			rev6 = new RevealFx(document.querySelector('#rev-6'), {
				revealSettings : {
					bgcolor: '#fff',
					delay: 250,
					direction: 'rl',
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			});

		watcher_2.enterViewport(function() {
			rev5.reveal();
			rev6.reveal();
			watcher_2.destroy();
		});

	}
})();