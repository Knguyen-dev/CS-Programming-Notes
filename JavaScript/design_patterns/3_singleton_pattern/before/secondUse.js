import FancyLogger from "./fancyLogger.js"

const logger = new FancyLogger()

export default function logSecondImplementation() {
    logger.printLogCount()
    logger.log("First file")
    logger.printLogCount()
}
