const { types } = require("hardhat/config")
const { networks } = require("../../networks")
const env = require("../../config/env")

task("functions-deploy-client", "Deploys the FunctionsConsumer contract")
  .addOptionalParam("verify", "Set to true to verify client contract", false, types.boolean)
  .setAction(async (taskArgs) => {
    if (network.name === "hardhat") {
      throw Error(
        'This command cannot be used on a local hardhat chain.  Specify a valid network or simulate an FunctionsConsumer request locally with "npx hardhat functions-simulate".'
      )
    }

    console.log(`Deploying FunctionsConsumer contract to ${network.name}`)

    const oracleAddress = networks[network.name]["functionsOracleProxy"]

    console.log("\n__Compiling Contracts__")
    await run("compile")

    const NFTRentMarketplace = await ethers.getContractFactory("NFTRentMarketplace")
    const nftRentMarketplace = await NFTRentMarketplace.deploy(
      env.vrfSubId,
      env.vrfCoordinatorContractAddress,
      env.vrfKeyHash,
      env.cfOracleAddress
    )

    console.log(
      `\nWaiting ${networks[network.name].confirmations} blocks for transaction ${nftRentMarketplace.deployTransaction.hash
      } to be confirmed...`
    )
    await nftRentMarketplace.deployTransaction.wait(networks[network.name].confirmations)

    const verifyContract = taskArgs.verify

    if (verifyContract && !!networks[network.name].verifyApiKey && networks[network.name].verifyApiKey !== "UNSET") {
      try {
        console.log("\nVerifying contract...")
        await nftRentMarketplace.deployTransaction.wait(Math.max(6 - networks[network.name].confirmations, 0))
        await run("verify:verify", {
          address: nftRentMarketplace.address,
          constructorArguments: [env.vrfSubId,
          env.vrfCoordinatorContractAddress,
          env.vrfKeyHash,
          env.cfOracleAddress],
        })
        console.log("Contract verified")
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log("Error verifying contract.  Delete the build folder and try again.")
          console.log(error)
        } else {
          console.log("Contract already verified")
        }
      }
    } else if (verifyContract) {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      )
    }

    console.log(`\nFunctionsConsumer contract deployed to ${nftRentMarketplace.address} on ${network.name}`)
  })