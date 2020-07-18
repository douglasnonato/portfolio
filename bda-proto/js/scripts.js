$( document ).ready(function() {

	// GENERAL

	$( ".close-modal" ).click(function() {
	 $( '.modal' ).removeClass( "show" );
	});

	$(document).keydown(function(event) { 
	  if (event.keyCode == 27) { 
	    $('.modal').removeClass( "show" );
	  }
	});

	$( "#dropdown-trigger, .dropdown .new, .dropdown .profile, .dropdown  .logout" ).click(function() {
	 $( '#top-menu-dropdown .dropdown' ).toggleClass( "slide" );
	 $( '#agenda-filter' ).removeClass( "open" );
	 $( '#agenda-settings' ).removeClass( "open" );
	});

	$( ".dropdown .change" ).click(function() {
	 $( '#agenda-modal-change-business' ).toggleClass( "show" );
	 $( '.dropdown' ).toggleClass( "slide" );
	 $( '#agenda-filter' ).removeClass( "open" );
	 $( '#agenda-settings' ).removeClass( "open" );
	});

	// AGENDA

	var header = $('#agenda-professionals')
	var time = $('#agenda-time')
	
	if (header.length) {
		setInterval(function() {
			header.css({ backgroundPositionX: (parseInt($('.ps__rail-x').css('left')) * -1 + 73) + 'px' })
			time.css({ backgroundPositionY: (parseInt($('.ps__rail-y').css('top')) * -1 + 0) + 'px' })
		}, 10)
	}

	$( "#agenda-modal-change-business li" ).click(function() {
	 $( '#agenda-modal-change-business' ).removeClass( "show" );
	});

	$( "#open-filter" ).click(function() {
	 $( '#agenda-filter' ).addClass( "open" );
	});
	$( "#close-filter" ).click(function() {
	 $( '#agenda-filter' ).removeClass( "open" );
	});


	$( "#open-settings" ).click(function() {
	 $( '#agenda-settings' ).addClass( "open" );
	});
	$( "#close-settings" ).click(function() {
	 $( '#agenda-settings' ).removeClass( "open" );
	});


	$( ".empty-slot" ).click(function() {
	 $( '#agenda-modal-new-appointment' ).addClass( "show" );
	});

	$( ".create-appointments" ).click(function() {
	 $( '.modal' ).removeClass( "show" );
	 $( '.appointment-card' ).addClass( "show" );
	});

	$( "#agenda-modal-delete-appointment .close-modal.positive" ).click(function() {
	 $( '.modal' ).removeClass( "show" );
	 $( '.appointment-card' ).removeClass( "show" );
	});

	$( ".appointment-card" ).click(function() {
	 $( '#agenda-modal-details' ).addClass( "show" );
	});

	$( ".blocked-card" ).click(function() {
	 $( '#agenda-modal-edit-block' ).addClass( "show" );
	});

	$( ".create-sales-order" ).click(function() {
	 $( '#agenda-modal-sales-order' ).addClass( "show" );
	 $( '#agenda-modal-details' ).removeClass( "show" );
	});

	$( ".delete-appointment" ).click(function() {
	 $( '#agenda-modal-delete-appointment' ).addClass( "show" );
	 $( '#agenda-modal-details' ).removeClass( "show" );
	});

	$( ".edit-appointment" ).click(function() {
	 $( '#agenda-modal-new-appointment' ).addClass( "show" );
	 $( '#agenda-modal-details' ).removeClass( "show" );
	});

	$( ".block-time" ).click(function() {
	 $( '#agenda-modal-block' ).addClass( "show" );
	 $( '#agenda-modal-new-appointment' ).removeClass( "show" );
	});

	$( ".new-appointment" ).click(function() {
	 $( '#agenda-modal-block' ).removeClass( "show" );
	 $( '#agenda-modal-new-appointment' ).addClass( "show" );
	});

	$( ".new-block-time" ).click(function() {
	 $( '.modal' ).removeClass( "show" );
	 $( '.blocked-card' ).addClass( "show" );
	});

	$( ".close-modal.delete" ).click(function() {
	 $( '.modal' ).removeClass( "show" );
	 $( '.blocked-card' ).removeClass( "show" );
	});

	$( ".add-new-professional" ).click(function() {
	 $( '#professionals-modal-new-professional' ).addClass( "show" );
	});

	//	CLIENTS 

	$( ".pages-dropdown" ).click(function() {
	 $( '.pages-dropdown .dropdown' ).toggleClass( "show" );
	});

	$( ".pages-dropdown .dropdown" ).mouseout(function() {
	 $( '.pages-dropdown .dropdown' ).removeClass( "show" );
	});

	$( ".birthday-dropdown" ).click(function() {
	 $( '.birthday-dropdown .dropdown' ).toggleClass( "show" );
	});

	$( ".birthday-dropdown .dropdown" ).mouseout(function() {
	 $( '.birthday-dropdown .dropdown' ).removeClass( "show" );
	});

	$( ".clients-list li, .profile-list li" ).click(function() {
	 $( '#clients-modal-profile' ).addClass( "show" );
	});

	$( ".delete-client" ).click(function() {
	 $( '#clients-modal-profile' ).removeClass( "show" );
	 $( '#clients-modal-delete-client' ).addClass( "show" );
	});

	$( ".new-client, #clients .register" ).click(function() {
	 $( '#clients-modal-new-client' ).addClass( "show" );
	});

	$( "#clients-modal-new-client .save" ).click(function() {
	 $( '#clients #empty-space' ).addClass( "hide" );
	});

	$( "#clients-modal-delete-client .positive" ).click(function() {
	 $( '#clients #empty-space' ).removeClass( "hide" );
	});

	$( ".history-list li" ).click(function() {
	 $( '#clients-modal-history' ).addClass( "show" );
	});

	// PROFESSIONALS

	$( ".new-professional, #professionals .register" ).click(function() {
	 $( '#professionals-modal-new-professional' ).addClass( "show" );
	});

	$( "#professionals-modal-new-professional .save" ).click(function() {
	 $( '#professionals #empty-space' ).addClass( "hide" );
	});

	$( ".professionals-list li, .profile-list li" ).click(function() {
	 $( '#professionals-modal-profile' ).addClass( "show" );
	});

	$( ".delete-professional" ).click(function() {
	 $( '#professionals-modal-profile' ).removeClass( "show" );
	 $( '#professionals-modal-delete-professional' ).addClass( "show" );
	});

	$( "#professionals-modal-delete-professional .positive" ).click(function() {
	 $( '#professionals #empty-space' ).removeClass( "hide" );
	});

	$( "#professionals .info" ).click(function() {
 	 $( '#professionals-modal-info' ).addClass( "show" );
	});

	// SALES ORDER

	$( "#sales-order .start" ).click(function() {
	 $( '#open-cash-register' ).addClass( "hide" );
	});

	$( ".open-sales-order" ).click(function() {
	 $( '#empty-space' ).addClass( "hide" );
	 $( '#sales-order-details' ).addClass( "show" );
	 $( '#sales-order .print' ).addClass( "show" );
	});

	$( ".new-client" ).click(function() {
	 $( '#sales-order-modal-new-client-short' ).addClass( "show" );
	});

	$( "#sales-order-modal-new-client-short .save, #sales-order-modal-new-client-full .save" ).click(function() {
	 $( '#sales-order-details' ).addClass( "show" );
	 $( '#empty-space' ).addClass( "hide" );
	 $( '#payment-form' ).addClass( "hide" );
	 $( '.sales-order-item.um' ).addClass( "hide" );
	 $( '.sales-order-item' ).removeClass( "show" );
	 $( '.sales-order-tip' ).removeClass( "show" );
	 $( '.payment-tip' ).removeClass( "show" );
	 $( '.payment-history' ).removeClass( "show" );
	 $( '.add-item' ).removeClass( "hide" );
 	 $( '.discount-applied' ).removeClass( "show" );
 	 $( '#saler-order-history' ).removeClass( "open" );
 	 $( '#sales-order-details .status' ).removeClass( "open" ).removeClass( "close" );
 	 $( '#delete-sales-order' ).addClass( "hide" );
	 $( '.payment-card' ).removeClass( "show" );
	});

	$( "#sales-order-modal-new-client-short .full" ).click(function() {
	 $( '#sales-order-modal-new-client-short' ).removeClass( "show" );
	 $( '#sales-order-modal-new-client-full' ).addClass( "show" );
	});

	$( "#sales-order-modal-new-client-full .full" ).click(function() {
	 $( '#sales-order-modal-new-client-short' ).addClass( "show" );
	 $( '#sales-order-modal-new-client-full' ).removeClass( "show" );
	});

	$( ".add-item" ).click(function() {
	 $( '#sales-order-modal-add-item' ).addClass( "show" );
	});

	$( ".sales-order-item .btn-edit" ).click(function() {
	 $( '#sales-order-modal-edit-item' ).addClass( "show" );
	});

	$( ".sales-order-tip .btn-edit" ).click(function() {
	 $( '#sales-order-modal-edit-tip' ).addClass( "show" );
	});

	$( "#sales-order-modal-add-item .tip" ).click(function() {
	 $( '#sales-order-modal-add-item' ).removeClass( "show" );
	 $( '#sales-order-modal-add-tip' ).addClass( "show" );
	});

	$( "#sales-order-modal-add-tip .item" ).click(function() {
	 $( '#sales-order-modal-add-tip' ).removeClass( "show" );
	 $( '#sales-order-modal-add-item' ).addClass( "show" );
	});

	$( "#sales-order-modal-add-tip .add" ).click(function() {
	 $( '.sales-order-tip' ).addClass( "show" );
	 $( '.payment-tip' ).addClass( "show" );
	 $( '.payment-history' ).addClass( "show" );
  	 $( '#payment-form' ).removeClass( "hide" );
  	 $( '#sales-order-details .status' ).addClass( "open" );
 	 $( '#delete-sales-order' ).removeClass( "hide" );
 	 $( '#sales-order .print' ).addClass( "show" );
	});

	$( "#sales-order-modal-add-item .add" ).click(function() {
	 $( '.sales-order-item' ).addClass( "show" );
  	 $( '#payment-form' ).removeClass( "hide" );
   	 $( '#sales-order-details .status' ).addClass( "open" );
 	 $( '#delete-sales-order' ).removeClass( "hide" );
   	 $( '.add-discount' ).removeClass( "hide" );
 	 $( '#sales-order .print' ).addClass( "show" );
	});

	$( "#sales-order .add-discount" ).click(function() {
	 $( '#sales-order-modal-discount' ).addClass( "show" );
	});

	$( "#sales-order-modal-discount .add" ).click(function() {
	 $( '.discount-applied' ).addClass( "show" );
   	 $( '.discount-applied' ).removeClass( "disabled" );
	});

	$( "#sales-order-details .sales-order-item.um .btn-delete" ).click(function() {
	 $( '#sales-order-modal-delete-item.um' ).addClass( "show" );
	});

	$( "#sales-order-details .sales-order-item.dois .btn-delete" ).click(function() {
	 $( '#sales-order-modal-delete-item.dois' ).addClass( "show" );
	});

	$( "#sales-order-modal-delete-item.um .positive" ).click(function() {
	 $( '#sales-order-details .sales-order-item.um' ).addClass( "hide" );
	});

	$( "#sales-order-modal-delete-item.dois .positive" ).click(function() {
	 $( '#sales-order-details .sales-order-item.dois' ).removeClass( "show" );
	});

	$( "#sales-order-details .sales-order-tip .btn-delete" ).click(function() {
	 $( '#sales-order-modal-delete-tip' ).addClass( "show" );
	});

	$( "#sales-order-details .payment-history .btn-delete" ).click(function() {
	 $( '.payment-card' ).removeClass( "show" );
	 $( '.add-item' ).removeClass( "hide" );
	 $( '.action.itens' ).removeClass( "disable" );
  	 $( '#payment-form' ).removeClass( "hide" );
  	 $( '.add-discount' ).removeClass( "hide" );
  	 $( '.discount-applied' ).removeClass( "disabled" );
  	 $( '#sales-order-details .status' ).addClass( "open" ).removeClass( "close" );
	});

	$( "#sales-order-details .receive" ).click(function() {
	 $( '#sales-order-details .payment-card' ).addClass( "show" );
 	 $( '.payment-history' ).addClass( "show" );
 	 $( '.action.itens' ).addClass( "disable" );
 	 $( '.add-item' ).addClass( "hide" );
  	 $( '#sales-order-details .status' ).addClass( "close" );
 	 $( '#payment-form' ).addClass( "hide" );
 	 $( '.add-discount' ).addClass( "hide" );
 	 $( '.discount-applied' ).addClass( "disabled" );
	});


	$( "#sales-order-modal-delete-tip .positive" ).click(function() {
	 $( '#sales-order-details .sales-order-tip' ).removeClass( "show" );
	 $( '.payment-tip' ).removeClass( "show" );
	});

	$( "#history" ).click(function() {
	 $( '#saler-order-history' ).addClass( "open" );
	});
	$( "#close-history" ).click(function() {
	 $( '#saler-order-history' ).removeClass( "open" );
	});

	$( "#new-sales-order" ).click(function() {
	 $( '#payment-form' ).addClass( "hide" );
	 $( '.sales-order-item.um' ).addClass( "hide" );
	 $( '.sales-order-item' ).removeClass( "show" );
	 $( '.sales-order-tip' ).removeClass( "show" );
	 $( '.payment-tip' ).removeClass( "show" );
	 $( '.payment-history' ).removeClass( "show" );
	 $( '.add-item' ).removeClass( "hide" );
 	 $( '.discount-applied' ).removeClass( "show" );
 	 $( '#saler-order-history' ).removeClass( "open" );
 	 $( '#sales-order-details .status' ).removeClass( "open" ).removeClass( "close" );
 	 $( '#delete-sales-order' ).addClass( "hide" );
	 $( '.payment-card' ).removeClass( "show" );
	});

	$( ".comanda" ).click(function() {
	 $( '#sales-order-details' ).removeClass( "show" );
	 $( '#cash-register' ).addClass( "hide" );
 	 $( '#empty-space' ).removeClass( "hide" );
	 $( '#payment-form' ).removeClass( "hide" );
	 $( '.sales-order-item.um' ).removeClass( "hide" );
	 $( '.sales-order-item' ).removeClass( "show" );
	 $( '.sales-order-tip' ).removeClass( "show" );
	 $( '.payment-tip' ).removeClass( "show" );
	 $( '.payment-history' ).removeClass( "show" );
	 $( '.add-item' ).removeClass( "hide" );
 	 $( '.discount-applied' ).removeClass( "show" );
 	 $( '#saler-order-history' ).removeClass( "open" );
 	 $( '#sales-order-details .status' ).addClass( "open" ).removeClass( "close" );
 	 $( '#delete-sales-order' ).removeClass( "hide" );
	 $( '.payment-card' ).removeClass( "show" );
  	 $( '.action.itens' ).removeClass( "disable" );
  	 $( '#sales-order #header' ).removeClass( "cash-register" );
 	 $( '#sales-order .print' ).removeClass( "show" );
	});

	$( ".caixa" ).click(function() {
	 $( '#sales-order-details' ).removeClass( "show" );
	 $( '#cash-register' ).removeClass( "hide" );
 	 $( '#empty-space' ).addClass( "hide" );
 	 $( '#sales-order #header' ).addClass( "cash-register" );
	});

	$( ".close-cash-register" ).click(function() {
 	 $( '#sales-order-close-cash-register' ).addClass( "show" );
	});

	$( "#sales-order-close-cash-register .close" ).click(function() {
 	 window.location.href = "sales-order.html";
	});

	$( "#sales-order .withdraw" ).click(function() {
 	 $( '#sales-order-withdraw' ).addClass( "show" );
	});

	$( "#sales-order .deposit" ).click(function() {
 	 $( '#sales-order-deposit' ).addClass( "show" );
	});

	// SERVICES

	$( "#services .register" ).click(function() {
 	 $( '#services-modal-beginner-info' ).addClass( "show" );
	});

	$( "#services-modal-beginner-info .got-it, #services .header .new-service" ).click(function() {
 	 $( '#services-modal-beginner-info' ).removeClass( "show" );
 	 $( '#services-modal-new-service' ).addClass( "show" );
	});

	$( "#services-modal-new-service .save, #services-modal-edit-service .delete,  #services-modal-edit-offer .delete" ).click(function() {
 	 $( '#services #empty-space' ).toggleClass( "hide" );
	});

	$( "#services .business-link" ).click(function() {
 	 $( '#services .sub-menu' ).addClass( "business" );
  	 $( '#services .sub-menu' ).removeClass( "skills" );
 	 $( '#services .sub-menu' ).removeClass( "msg" );
  	 $( '#services #skills' ).removeClass( "show" );
 	 $( '#services #business' ).removeClass( "hide" );
 	 $( '#services #msg' ).removeClass( "show" );
	});

	$( "#services .skills-link" ).click(function() {
 	 $( '#services .sub-menu' ).addClass( "skills" );
 	 $( '#services .sub-menu' ).removeClass( "business" );
 	 $( '#services .sub-menu' ).removeClass( "msg" );
 	 $( '#services #skills' ).addClass( "show" );
 	 $( '#services #business' ).addClass( "hide" );
 	 $( '#services #msg' ).removeClass( "show" );
  	 $( '#services #skills .empty' ).removeClass( "hide" );
 	 $( '#services #skills .professional-skills' ).removeClass( "show" );
	});

	$( "#services .msg-link" ).click(function() {
 	 $( '#services .sub-menu' ).addClass( "msg" );
 	 $( '#services .sub-menu' ).removeClass( "business" );
 	 $( '#services .sub-menu' ).removeClass( "skills" );
   	 $( '#services #skills' ).removeClass( "show" );
 	 $( '#services #business' ).addClass( "hide" );
 	 $( '#services #msg' ).addClass( "show" );
	});

	$( "#services .header .info" ).click(function() {
 	 $( '#services-modal-info' ).addClass( "show" );
	});

	$( "#services .categories .color, #services .categories .colorpicker" ).click(function() {
		var parent = $(this).parent()

	 $( '.open', parent ).toggleClass( "show" );
	 $( '.close', parent ).toggleClass( "hide" );
	 $( '.colorpicker', parent ).toggleClass( "show" );
	 $( '.color', parent ).toggleClass( "hide" );
	 $( '#services .category-colapsed' ).toggleClass( "hide" );
	 $( '#services .category-open' ).toggleClass( "show" );
	});

	$( "#services .payment li" ).click(function() {
	 $( '.dropdown', this ).toggleClass( "show" );
	});

	$( "#services .appointment li" ).click(function() {
	 $( '.dropdown', this ).toggleClass( "show" );
	});

	$( "#services .categories li" ).click(function() {
 	 $( '#services .category-colapsed' ).toggleClass( "hide" );
	 $( '#services .category-open' ).toggleClass( "show" );
	});

	$( "#services .config li" ).click(function() {
 	 $( '#services-modal-edit-service' ).addClass( "show" );
	});

	$( "#services-modal-edit-service .offer, #services-modal-edit-offer .service" ).click(function() {
 	 $( '#services-modal-edit-offer' ).toggleClass( "show" );
 	 $( '#services-modal-edit-service' ).toggleClass( "show" );
	});

	$( "#services .select-professional" ).click(function() {
 	 $( '#services #skills .empty' ).addClass( "hide" );
 	 $( '#services #skills .professional-skills' ).addClass( "show" );
	});

	// REPORTS

	$( "li.chart" ).click(function() {
	 $( '#menu-reports' ).addClass( "hide" );
 	 $( '#report-chart' ).addClass( "show" );
	});

	$( "#report-chart .link li:nth-of-type(1)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(1)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(1)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(1)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(2)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(2)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(2)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(2)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(3)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(3)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(3)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(3)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(4)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(4)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(4)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(4)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(5)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(5)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(5)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(5)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(6)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(6)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(6)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(6)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(7)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(7)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(7)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(7)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(8)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(8)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(8)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(8)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(9)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(9)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(9)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(9)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(10)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(10)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(10)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(10)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(11)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(11)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(11)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(11)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(12)" ).mouseover(function() {
	 $( '#report-chart .hover li:nth-of-type(12)' ).toggleClass( "active" );
	});

	$( "#report-chart .link li:nth-of-type(12)" ).mouseout(function() {
	 $( '#report-chart .hover li:nth-of-type(12)' ).toggleClass( "active" );
	});

	$( "li.list" ).click(function() {
	 $( '#menu-reports' ).addClass( "hide" );
 	 $( '#report-list' ).addClass( "show" );
	});

	$( "#report-list .appointments-list" ).click(function() {
	 $( '#reports-modal-appointment-details' ).addClass( "show" );
	});

	$( "#reports-modal-appointment-details .profile" ).click(function() {
	 $( '#reports-modal-profile' ).addClass( "show" );
	});

	$( "#report-list .clients-list li" ).click(function() {
	 $( '#reports-modal-profile' ).addClass( "show" );
	});

	$( "#reports .back" ).click(function() {
	 $( '#menu-reports' ).removeClass( "hide" );
 	 $( '#report-chart' ).removeClass( "show" );
 	 $( '#report-list' ).removeClass( "show" );
	});

	$( "#report-chart .info" ).click(function() {
 	 $( '#reports-modal-info' ).addClass( "show" );
	});

	$( "#open-filter" ).click(function() {
	 $( '#report-filter' ).addClass( "open" );
	});
	$( "#close-filter" ).click(function() {
	 $( '#report-filter' ).removeClass( "open" );
	});

});



