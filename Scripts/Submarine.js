function Submarine( x,y,gfx )
{
	const ctrls = {
		Up: 'W',
		Down: 'S',
		Left: 'A',
		Right: 'D'
	};
	const size = Vec2( 32,32 );
	const pos = Vec2( gfx.ScreenWidth,gfx.ScreenHeight )
		.GetDivided( 2 ).GetSubtracted( size );
	const moveAmount = Vec2( 0,0 );
	const vel = Vec2( 0,0 );
	const slowdown = 0.95;
	const maxSpeed = 5.1;
	const image = gfx.LoadImage( "Images/Sub.png" );
	// 
	this.Update=( kbd )=>
	{
		if( kbd.KeyDown( ctrls.Up ) ) --vel.y;
		if( kbd.KeyDown( ctrls.Down ) ) ++vel.y;
		if( kbd.KeyDown( ctrls.Left ) ) --vel.x;
		if( kbd.KeyDown( ctrls.Right ) ) ++vel.x;
		
		if( vel.x > maxSpeed ) vel.x = maxSpeed;
		if( vel.y > maxSpeed ) vel.y = maxSpeed;
		if( vel.x < -maxSpeed ) vel.x = -maxSpeed;
		if( vel.y < -maxSpeed ) vel.y = -maxSpeed;
		
		if( vel.y < 0.0 ) vel.y += 0.2;
		
		// pos.Add( vel );
		moveAmount.Add( vel );
		vel.Multiply( slowdown );
	}
	
	this.Draw=( gfx )=>
	{
		// gfx.DrawRect( pos,size,"red" );
		gfx.DrawImage( image,pos,size );
	}
	
	this.ResetDelta=()=>
	{
		moveAmount.x = 0.0;
		moveAmount.y = 0.0;
	}
	
	this.GetDelta=()=>
	{
		return( moveAmount.GetMultiplied( -1 ) );
	}
}