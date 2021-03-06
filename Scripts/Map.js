function Map( shop,scoreManager )
{
	const terrain = [];
	const treasures = [];
	const enemies = [];
	const maxSubDmg = 6;
	// 
	this.InitWorld=( gfx,bullets )=>
	{
		const mm = new MainMap( gfx,bullets );
		const worldArr = mm.Terrain;
		const treasArr = mm.Treasures;
		const enemyArr = mm.Enemies;
		
		for( var w in worldArr )
		{
			terrain.push( worldArr[w] );
		}
		
		for( var t in treasArr )
		{
			treasures.push( treasArr[t] );
		}
		
		for( var e in enemyArr )
		{
			enemies.push( enemyArr[e] );
		}
	}
	
	this.Update=( playerPos,gfx,torpedoes,combo )=>
	{
		let bal = 0;
		
		for( var e in enemies )
		{
			enemies[e].Update( playerPos,gfx );
			enemies[e].Update2();
			
			for( var tp in torpedoes )
			{
				if( torpedoes[tp].GetRect()
					.Overlaps( enemies[e].GetRect() ) )
				{
					enemies[e].Hurt( shop.DamageAdd() * maxSubDmg );
					torpedoes[tp].Kill();
				}
			}
			
			if( enemies[e].IsDead() )
			{
				scoreManager.AddScore( enemies[e].GetPrice() * 10 );
				combo.AddAndRefresh();
				bal += enemies[e].GetPrice();
				enemies.splice( e,1 );
			}
		}
		
		return( bal );
	}
	
	this.Draw=( gfx )=>
	{
		for( var ter in terrain )
		{
			terrain[ter].Draw( gfx );
		}
		
		for( var tr in treasures )
		{
			treasures[tr].Draw( gfx );
		}
		
		for( var e in enemies )
		{
			enemies[e].Draw( gfx );
			enemies[e].Draw2( gfx );
		}
	}
	
	this.MoveAll=( amount )=>
	{
		for( var ter in terrain )
		{
			terrain[ter].Update( amount );
		}
		
		for( var tr in treasures )
		{
			treasures[tr].Update( amount );
		}
		
		// TODO: Optimize this somehow.
		for( var t in treasures )
		{
			if( treasures[t].WillRemove() )
			{
				treasures.splice( t,1 );
			}
		}
		
		for( var e in enemies )
		{
			enemies[e].MoveBy( amount );
		}
	}
	
	this.Reset=()=>
	{
		terrain.splice( 0,terrain.length );
		treasures.splice( 0,treasures.length );
		enemies.splice( 0,enemies.length );
	}
	
	this.GetTerrainRects=()=>
	{
		const temp = [];
		
		for( var t in terrain )
		{
			temp.push( terrain[t].GetRect() );
		}
		
		return( temp );
	}
	
	this.GetTreasures=()=>
	{
		return( treasures );
	}
	
	this.GetEnemies=()=>
	{
		return( enemies );
	}
	
	this.GetClosestEnemy=( target )=>
	{
		// console.clear();
		let shortest = 99999999;
		let toReturn = 0;
		for( var en in enemies )
		{
			const e = enemies[en];
			
			const dist = e.GetPos().GetSubtracted( target )
				.GetLengthSq();
			
			// console.log( Math.sqrt( dist ) );
			
			if( dist < shortest )
			{
				// console.log( e.GetPos().GetSubtracted( target ) );
				// console.log( Math.sqrt( dist ) );
				shortest = dist;
				toReturn = en;
			}
		}
		
		return( enemies[toReturn] );
	}
}