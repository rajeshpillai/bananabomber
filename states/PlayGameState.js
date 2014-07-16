function PlayGameState()
{
	this.theta = 0;
	
	this.bombers = {};
	this.stage = {};
	
	this.initiate = function()
	{
		$("#play.view").show();
		
		this.stage = new Stage();
		
		//this.stage.addBomber("red");
		//this.stage.addBomber("blue");
		//this.stage.addBomber("green");
		//this.stage.addBomber("purple");
	}
	
	this.update = function(delta)
	{
		console.log(Math.floor(this.theta += delta));
	}
	
	this.render = function(delta)
	{
		$("canvas").render(this.stage);
		//$("canvas").camera("#red.screen", 10, 10);
	}
	
	this.terminate = function()
	{
		$("#play.view").hide();
	}
}

(function($)
{
	$.fn.render = function(stuff)
	{
		return this.each(function()
		{
			if(stuff.render)
			{
				var rendering = stuff.render();
				
				if(rendering instanceof Array)
				{
					for(var s in rendering)
						this.render(rendering[s]);
				}
				else
				{
					this.render(rendering)
				}
			}
			else
			{
				this.draw(stuff);
			}
		}
		.bind(this));
	}
}
(jQuery));