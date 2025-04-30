import CircleHolder from "@/components/circle_holders";
export default function Home() {
  return (
    <div id='burger-wrapper'>		<header>
			<h1 className='text-circles-dark-blue text-4xl'>SMASH BURGER</h1>
			<h2 className='text-cyan-400 text-3xl'>IS THERE A COMPILER THAT COMPILES PYTHON INTO JAVASCRIPT?</h2>
			<div className="mt-8 flex justify-center space-x-6">
				<CircleHolder 
					imageSrc="/images/profile1.jpg" 
					name="John Doe"
				/>
				<CircleHolder 
					imageSrc="/images/profile2.jpg" 
					name="Vins Abais"
				/>
				<CircleHolder 
					imageSrc="/images/profile3.jpg" 
					name="Alex Johnson"
				/>
			</div>
		</header>
	</div>
  );
}
