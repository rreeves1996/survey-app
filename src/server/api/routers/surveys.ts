import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const surveyRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.survey.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  // create: protectedProcedure.input(z.object({ name: z.string() })),
});
