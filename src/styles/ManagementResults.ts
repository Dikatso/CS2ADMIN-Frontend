import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    display: `flex`,

    [theme.fn.smallerThan(`xs`)]: {
      flexDirection: `column`,
    },
  },

  icon: {
    marginLeft: `auto`,
    marginRight: `auto`,
    marginTop: theme.spacing.lg,
    color: theme.colors[theme.primaryColor][6],
  },

  stat: {
    minWidth: 98,
    paddingTop: theme.spacing.xl,
    minHeight: 140,
    display: `flex`,
    flex: 1,
    flexDirection: `column`,
    justifyContent: `space-between`,
    backgroundColor: theme.white,
  },

  label: {
    textTransform: `uppercase`,
    fontWeight: 700,
    fontSize: theme.fontSizes.xl,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colors.gray[6],
    lineHeight: 1.2,
  },

  value: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    color: theme.black,
  },

  count: {
    color: theme.colors.gray[6],
  },

  assignmentNo: {
    fontSize: 44,
    fontWeight: 700,
    color: theme.white,
    lineHeight: 1,
    textAlign: `center`,
    marginBottom: 5,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  assignment: {
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    lineHeight: 1,
    textAlign: `center`,
  },

  controls: {
    display: `flex`,
    flexDirection: `column`,
    marginRight: theme.spacing.xl * 2,

    [theme.fn.smallerThan(`xs`)]: {
      flexDirection: `row`,
      alignItems: `center`,
      marginRight: 0,
      marginBottom: theme.spacing.xl,
    },
  },

  assessment: {
    flex: 1,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
  },

  control: {
    height: 28,
    width: `100%`,
    color: theme.colors[theme.primaryColor][2],
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    borderRadius: theme.radius.md,
    transition: `background-color 50ms ease`,

    [theme.fn.smallerThan(`xs`)]: {
      height: 34,
      width: 34,
    },

    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][5],
      color: theme.white,
    },
  },

  controlIcon: {
    [theme.fn.smallerThan(`xs`)]: {
      transform: `rotate(-90deg)`,
    },
  },
}));
