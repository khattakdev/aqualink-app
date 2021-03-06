import React from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Grid,
} from "@material-ui/core";

import type { DailyData } from "../../../../store/Reefs/types";

import { findIntervalByLevel } from "../../../../helpers/bleachingAlertIntervals";
import { styles as incomingStyles } from "../styles";

const Bleaching = ({ dailyData, classes }: BleachingProps) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        title={
          <Grid container justify="flex-start">
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="h6">
                HEAT STRESS ALERT LEVEL
              </Typography>
            </Grid>
          </Grid>
        }
      />
      <CardContent className={classes.contentWrapper}>
        <Grid
          style={{ height: "100%" }}
          container
          alignItems="center"
          justify="center"
          item
          xs={12}
        >
          <img
            src={findIntervalByLevel(dailyData.weeklyAlertLevel).image}
            alt="alert-level"
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

const styles = () =>
  createStyles({
    ...incomingStyles,
    card: {
      ...incomingStyles.card,
      height: "100%",
      width: "100%",
      backgroundColor: "#eff0f0",
      display: "flex",
      flexDirection: "column",
      paddingBottom: "1rem",
    },
    header: {
      flex: "0 1 auto",
      padding: "1rem",
    },
    contentWrapper: {
      padding: 0,
    },
  });

interface BleachingIncomingProps {
  dailyData: DailyData;
}

type BleachingProps = WithStyles<typeof styles> & BleachingIncomingProps;

export default withStyles(styles)(Bleaching);
