pklib = this.pklib || {};

pklib.cookie = (function() {
   
	return {

	    create: function(name, value, days) {
	    	var expires = '',
	    		value = value || null;
	    	
	        if (typeof days != 'undefined') {
	            var date = new Date();
	            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	            expires = '; expires=' + date.toGMTString();
	        }
	        
	        document.cookie = name + '=' + value + expires + '; path=/';
	        
	        return this.read(name);
	    },

	    read: function(name) {
	        var nameEQ = name + '=',
	        	ca = document.cookie.split(';');
	        
	        for(var i = 0; i < ca.length; ++i) {
	            var c = ca[i];
	            while (c.charAt(0) === ' ') {
	                c = c.substring(1, c.length);
	            }
	            if (c.indexOf(nameEQ) === 0) {
	                return c.substring(nameEQ.length, c.length);
	            }
	        }
	        
	        return undefined;
	    },
	    
	    erase: function(name) {
	        this.create(name, undefined, -1);
	    }
	    
	};

})();