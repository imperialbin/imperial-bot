import { Command, CommandOptions, PieceContext } from "@sapphire/framework";

export abstract class ImperialCommand extends Command {
  public constructor(
    context: PieceContext,
    { name, ...options }: CommandOptions
  ) {
    super(context, { name, ...options, quotes: [] });
  }
}
