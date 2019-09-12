function Element(Name, CanvasID, Color, CN, Height, Width, Distance, UP)
{
	this.Element = Name;
	var canvas = document.getElementById(CanvasID);
	this.draw = canvas.getContext('2d');
	this.color = Color;
	this.CHANNEL = CN;
	canvas.height = Height;
	canvas.width = Width;
	this.width = canvas.width;
	this.height = canvas.height;
	this.Distance = Distance;
	
	this.UP = UP;
	this.ED = ElementDraw;
	this.CHM = CHM;
	this.ED();
	this.CHM();
}

function Channel(Name, Col1, Col2, Col3, Min, Max, NH, KH)
{
	this.Channel = Name;
	this.col1 = Col1;
	this.col2 = Col2;
	this.col3 = Col3;
	this.min = Min;
	this.max = Max;
	this.NH = NH;
	this.KH = KH;
}

Channel.prototype.ChannelDraw = function(Draw, L, W, H)
{
	if(this.min == 0)
	{
	this.koef = (H-80)/this.max;
	}
	if(this.min < 0)
	{
	this.koef = (H-80)/(this.max-this.min);
	}
	if(this.min > 0)
	{
	this.koef = (H-80)/(this.max-this.min);
	}
	this.centerX = (W/2)+L;
	this.centerY = (H/2)+50;
	Draw.strokeStyle = "black";
	Draw.lineWidth = 6;
	Draw.strokeRect(L, 50, W, H-80);
	Draw.clearRect(L, 50 , W, H-80);
	
	Draw.font = "bold 14px sans-serif";
	Draw.textAlign = "center";
	Draw.fillStyle = "white";
	Draw.fillText(this.Channel, this.centerX, H-10);
	this.X = L;
	this.H = H-80;
	this.W = W;
	this.Line = Line;
	this.Line(Draw);
}

function ElementDraw()
{
	this.draw.fillStyle = this.color;
	this.draw.fillRect(0, 0, this.width, this.height);
	this.draw.fillStyle = "white";
	this.draw.font = "bold 24px sans-serif";
	this.draw.textAlign = "center";
	this.draw.fillText(this.Element, this.width/2, 30);
}

function CHM()
{
	var N = this.CHANNEL.length;
	var i = 0;
	var left = 0;
	this.WC = ((this.width - (this.Distance*(N+1)))/N);
	for(i = 0; i< N; i++)
	{
		left = this.Distance + (this.Distance+this.WC)*i;
		this.CHANNEL[i].ChannelDraw(this.draw, left, this.WC, this.height);
		this.CHANNEL[i].DrawCh(this.draw, 260);
	}
}

Channel.prototype.DrawCh = function(Draw, H)
{	
	Draw.clearRect(this.X, 50 ,this.W, this.H);
	H = H - this.min;
		
	if(((H +this.min) < this.NH)||((H +this.min) == this.NH)){Draw.fillStyle = this.col1;}
	if((((H +this.min) > this.NH)&&((H +this.min) < this.KH))||((H +this.min) == this.KH)){Draw.fillStyle = this.col2;}
	if((H +this.min) > this.KH){Draw.fillStyle = this.col3;}
		
	if(((H +this.min) > this.min)&&((H +this.min) < this.max))
	{
		Draw.fillRect(this.X, this.H+50-H*this.koef ,this.W, H*this.koef);
	}
		
	if((H +this.min) > this.max)
	{
		Draw.fillRect(this.X, 50, this.W, this.H);
	}
		
	this.Line(Draw);
	Draw.fillStyle = "black";
	Draw.font = "bold 28px sans-serif";
	Draw.textAlign = "center";
	Draw.fillText(H+this.min, this.centerX, this.centerY);
}

function Line(Draw)
{
	Draw.strokeStyle = this.col1;
	Draw.fillStyle = this.col1;
	Draw.font = "bold 14px sans-serif";
	Draw.textAlign = "left";
	Draw.lineWidth = 1;
	Draw.beginPath();
	Draw.moveTo(this.X, this.H + 50 - (this.NH - this.min)*this.koef);
	Draw.lineTo(this.X + this.W, this.H + 50 - (this.NH - this.min)*this.koef);
	Draw.fillText(this.NH, this.X + 2, this.H + 50 - 2 -(this.NH - this.min)*this.koef);
	Draw.stroke();
	Draw.closePath();
		
	Draw.strokeStyle = this.col2;
	Draw.fillStyle = this.col2;
	Draw.beginPath();
	Draw.moveTo(this.X, this.H + 50 - (this.KH - this.min)*this.koef);
	Draw.lineTo(this.X + this.W, this.H + 50 - (this.KH - this.min)*this.koef);
	Draw.fillText(this.KH, this.X + 2, this.H + 50 - 2 -(this.KH - this.min)*this.koef);//alert(this.koef);
	Draw.stroke();
	Draw.closePath();
		
	Draw.fillStyle = "black";
	Draw.textAlign = "center";
	Draw.fillText("max = " + this.max, this.centerX, 65);
	Draw.fillText("min = " + this.min, this.centerX, this.H+45);
	}	