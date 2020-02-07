import { useEffect } from "react";

export default function useTimer(timerFn:()=>void,time:number=1000)
{
	useEffect(() =>
	{
		let timer = setInterval(() =>
		{
			timerFn();
		}, time);

		return () => { clearInterval(timer) }
	});
}
