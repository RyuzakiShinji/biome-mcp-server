import { exec } from "node:child_process";
import { promisify } from "node:util";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/**
 * Create an MCP server for Biome linting and formatting
 */
const biomeServer = new McpServer({
	name: "Biome Tools",
	version: "1.0.0",
});

/**
 * Biome Lint Tool
 * Lints code with Biome
 */
biomeServer.tool(
	"biome-lint",
	"Run Biome linting on files",
	{
		paths: z.array(z.string()).describe("File paths to lint"),
		configPath: z
			.string()
			.optional()
			.describe("Path to the Biome configuration file"),
	},
	async ({ paths, configPath }) => {
		const biomeCommand = `biome lint ${configPath ? `--config-path ${configPath}` : ""} ${paths.join(" ")}`;
		const execAsync = promisify(exec);
		try {
			const { stdout, stderr } = await execAsync(biomeCommand);
			return {
				content: [
					{
						type: "text",
						text: stdout || stderr,
					},
				],
			};
		} catch (error) {
			return {
				content: [
					{
						type: "text",
						text: `Error running Biome lint: ${error instanceof Error ? error.message : String(error)}`,
					},
				],
			};
		}
	},
);

/**
 * Biome Format Tool
 * Formats code with Biome
 */
biomeServer.tool(
	"biome-format",
	"Run Biome formatting on files",
	{
		paths: z.array(z.string()).describe("File paths to format"),
		configPath: z
			.string()
			.optional()
			.describe("Path to the Biome configuration file"),
	},
	async ({ paths, configPath }) => {
		const biomeCommand = `biome format ${configPath ? `--config-path ${configPath}` : ""} --write ${paths.join(" ")}`;
		const execAsync = promisify(exec);
		try {
			const { stdout, stderr } = await execAsync(biomeCommand);
			return {
				content: [
					{
						type: "text",
						text: stdout || stderr,
					},
				],
			};
		} catch (error) {
			return {
				content: [
					{
						type: "text",
						text: `Error running Biome format: ${error instanceof Error ? error.message : String(error)}`,
					},
				],
			};
		}
	},
);

const transport = new StdioServerTransport();
await biomeServer.connect(transport);
