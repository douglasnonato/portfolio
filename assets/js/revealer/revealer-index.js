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
				delay: 250,
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
					direction: 'rl',
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),
			rev4 = new RevealFx(document.querySelector('#rev-4'), {
				revealSettings : {
					bgcolor: '#fff',
					delay: 250,
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),
			rev5 = new RevealFx(document.querySelector('#rev-5'), {
				revealSettings : {
					bgcolor: '#fff',
					delay: 500,
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),

			scrollElemToWatch_2 = document.getElementById('rev-6'),
			watcher_2 = scrollMonitor.create(scrollElemToWatch_2, -300),
			rev6 = new RevealFx(scrollElemToWatch_2, {
				revealSettings : {
					bgcolor: '#D4EA01',
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),
			rev7 = new RevealFx(document.querySelector('#rev-7'), {
				revealSettings : {
					bgcolor: '#fff',
					direction: 'rl',
					delay: 250,
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),
			rev8 = new RevealFx(document.querySelector('#rev-8'), {
				revealSettings : {
					bgcolor: '#fff',
					direction: 'rl',
					delay: 500,
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),

			scrollElemToWatch_3 = document.getElementById('rev-9'),
			watcher_3 = scrollMonitor.create(scrollElemToWatch_3, -300),
			rev9 = new RevealFx(scrollElemToWatch_3, {
				revealSettings : {
					bgcolor: '#D4EA01',
					direction: 'rl',
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),
			rev10 = new RevealFx(document.querySelector('#rev-10'), {
				revealSettings : {
					bgcolor: '#fff',
					delay: 250,
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),
			rev11 = new RevealFx(document.querySelector('#rev-11'), {
				revealSettings : {
					bgcolor: '#fff',
					delay: 500,
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),

			scrollElemToWatch_4 = document.getElementById('rev-12'),
			watcher_4 = scrollMonitor.create(scrollElemToWatch_4, -300),
			rev12 = new RevealFx(scrollElemToWatch_4, {
				revealSettings : {
					bgcolor: '#D4EA01',
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),
			rev13 = new RevealFx(document.querySelector('#rev-13'), {
				revealSettings : {
					bgcolor: '#fff',
					direction: 'rl',
					delay: 250,
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			}),
			rev14 = new RevealFx(document.querySelector('#rev-14'), {
				revealSettings : {
					bgcolor: '#fff',
					direction: 'rl',
					delay: 500,
					onCover: function(contentEl, revealerEl) {
						contentEl.style.opacity = 1;
					}
				}
			});

			// scrollElemToWatch_5 = document.getElementById('rev-15'),
			// watcher_5 = scrollMonitor.create(scrollElemToWatch_5, -300),
			// rev15 = new RevealFx(scrollElemToWatch_5, {
			// 	revealSettings : {
			// 		bgcolor: '#D4EA01',
			// 		onCover: function(contentEl, revealerEl) {
			// 			contentEl.style.opacity = 1;
			// 		}
			// 	}
			// }),
			// rev16 = new RevealFx(document.querySelector('#rev-16'), {
			// 	revealSettings : {
			// 		bgcolor: '#fff',
			// 		direction: 'rl',
			// 		delay: 250,
			// 		onCover: function(contentEl, revealerEl) {
			// 			contentEl.style.opacity = 1;
			// 		}
			// 	}
			// }),
			// rev17 = new RevealFx(document.querySelector('#rev-17'), {
			// 	revealSettings : {
			// 		bgcolor: '#fff',
			// 		direction: 'rl',
			// 		delay: 500,
			// 		onCover: function(contentEl, revealerEl) {
			// 			contentEl.style.opacity = 1;
			// 		}
			// 	}
			// });

		watcher_1.enterViewport(function() {
			rev3.reveal();
			rev4.reveal();
			rev5.reveal();
			watcher_1.destroy();
		});
		watcher_2.enterViewport(function() {
			rev6.reveal();
			rev7.reveal();
			rev8.reveal();
			watcher_2.destroy();
		});
		watcher_3.enterViewport(function() {
			rev9.reveal();
			rev10.reveal();
			rev11.reveal();
			watcher_3.destroy();
		});
		watcher_4.enterViewport(function() {
			rev12.reveal();
			rev13.reveal();
			rev14.reveal();
			watcher_4.destroy();
		});
		// watcher_5.enterViewport(function() {
		// 	rev15.reveal();
		// 	rev16.reveal();
		// 	rev17.reveal();
		// 	watcher_5.destroy();
		// });

		//************************ Example 3 - api examples ********************************
		
		var rev15 = new RevealFx(document.querySelector('#rev-15')),
			trigger_1 = document.getElementById('rev-trigger-1'),
			trigger_2 = document.getElementById('rev-trigger-2'),
			trigger_3 = document.getElementById('rev-trigger-3'),
			trigger_4 = document.getElementById('rev-trigger-4'),
			trigger_5 = document.getElementById('rev-trigger-5');
		
		trigger_1.addEventListener('click', function() {
			rev12.reveal({
				bgcolor: '#c1c0b7',
				duration: 300,
				onStart: function(contentEl, revealerEl) { contentEl.style.opacity = 0; },
				onCover: function(contentEl, revealerEl) { contentEl.style.opacity = 1; }
			});
		});

		trigger_2.addEventListener('click', function() {
			rev12.reveal({
				bgcolor: '#c1c0b7',
				duration: 300,
				direction: 'rl',
				onStart: function(contentEl, revealerEl) { contentEl.style.opacity = 0; },
				onCover: function(contentEl, revealerEl) { contentEl.style.opacity = 1; }
			});
		});

		trigger_3.addEventListener('click', function() {
			rev12.reveal({
				bgcolor: '#c1c0b7',
				easing: 'easeOutExpo',
				direction: 'bt',
				onStart: function(contentEl, revealerEl) { 
					anime.remove(contentEl);
					contentEl.style.opacity = 0; 
				},
				onCover: function(contentEl, revealerEl) { 
					anime({
						targets: contentEl,
						duration: 800,
						delay: 80,
						easing: 'easeOutExpo',
						translateY: [40,0],
						opacity: [0,1]
					});
				}
			});
		});

		trigger_4.addEventListener('click', function() {
			rev12.reveal({
				bgcolor: '#c1c0b7',
				duration: 300,
				direction: 'tb',
				onStart: function(contentEl, revealerEl) { 
					anime.remove(contentEl);
					contentEl.style.opacity = 0; 
				},
				onCover: function(contentEl, revealerEl) { 
					anime({
						targets: contentEl,
						duration: 500,
						delay: 50,
						easing: 'easeOutBounce',
						translateY: [-40,0],
						opacity: {
							value: [0,1],
							duration: 300,
							easing: 'linear'
						}
					});
				}
			});
		});

		trigger_5.addEventListener('click', function() {
			rev12.reveal({
				bgcolor: '#7f40f1',
				duration: 400,
				easing: 'easeInOutQuad',
				onStart: function(contentEl, revealerEl) { 
					anime.remove(contentEl);
					contentEl.style.opacity = 0; 
				},
				onCover: function(contentEl, revealerEl) { 
					contentEl.style.opacity = 1; 
					anime({
						targets: contentEl,
						duration: 800,
						delay: 80,
						easing: 'easeOutExpo',
						scale: [0.5,1],
						opacity: [0,1]
					});
				}
			});
		});
	}
})();