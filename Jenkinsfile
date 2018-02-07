pipeline
{
	agent any

	environment
	{
		TARGET="demoweb.tar.gz"
		DEPLOY_PATH="/work/web/localhost/demo"
		DEPLOY_TARGET="demoweb"
	}

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

					tar -czf $TARGET public
				   '''
			}
		}

		stage("Publish artifact")
		{
			steps
			{
				archiveArtifacts artifacts: "**/$TARGET"
			}
		}

		stage("Deploy")
		{
			steps
			{
				sh '''
					cp $TARGET $DEPLOY_PATH
					cd $DEPLOY_PATH
					rm -rf $DEPLOY_TARGET
					mkdir $DEPLOY_TARGET
					tar -xvf $TARGET -C $DEPLOY_TARGET
				   '''
			}
		}
	}
}
