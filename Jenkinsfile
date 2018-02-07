pipeline
{
	agent any

	stages
	{
		stage("Initialize")
		{
			steps
			{
				sh '''
					npm install
				   '''
			}
		}

		stage("Build")
		{
			steps
			{
				sh '''
					gulp build
				   '''
			}
		}

		stage("Deploy")
		{
			steps
			{
				sh '''
					ls -R public
				   '''
			}
		}
	}
}
