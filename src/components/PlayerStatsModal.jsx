// src/components/PlayerStatsModal.jsx
import React from 'react';
import { Modal, Table } from 'antd';

const PlayerStatsModal = ({ player, visible, onClose }) => {
  const getColumns = (position) => {
    const baseColumns = [
      { title: 'Week', dataIndex: 'week', sorter: (a, b) => a.week - b.week },
    ];
    if (position === 'QB') {
      return [
        ...baseColumns,
        { title: 'Passing Yards', dataIndex: 'passingYards', sorter: (a, b) => a.passingYards - b.passingYards },
        { title: 'Touchdowns', dataIndex: 'touchdowns', sorter: (a, b) => a.touchdowns - b.touchdowns },
        { title: 'Interceptions', dataIndex: 'interceptions', sorter: (a, b) => a.interceptions - b.interceptions },
      ];
    }
    if (position === 'RB') {
      return [
        ...baseColumns,
        { title: 'Rushing Yards', dataIndex: 'rushingYards', sorter: (a, b) => a.rushingYards - b.rushingYards },
        { title: 'Touchdowns', dataIndex: 'touchdowns', sorter: (a, b) => a.touchdowns - b.touchdowns },
        { title: 'Fumbles', dataIndex: 'fumbles', sorter: (a, b) => a.fumbles - b.fumbles },
      ];
    }
    if (position === 'WR') {
      return [
        ...baseColumns,
        { title: 'Receiving Yards', dataIndex: 'receivingYards', sorter: (a, b) => a.receivingYards - b.receivingYards },
        { title: 'Touchdowns', dataIndex: 'touchdowns', sorter: (a, b) => a.touchdowns - b.touchdowns },
        { title: 'Receptions', dataIndex: 'receptions', sorter: (a, b) => a.receptions - b.receptions },
      ];
    }
    if (position === 'CB') {
      return [
        ...baseColumns,
        { title: 'Tackles', dataIndex: 'tackles', sorter: (a, b) => a.tackles - b.tackles },
        { title: 'Interceptions', dataIndex: 'interceptions', sorter: (a, b) => a.interceptions - b.interceptions },
        { title: 'Pass Deflections', dataIndex: 'passDeflections', sorter: (a, b) => a.passDeflections - b.passDeflections },
      ];
    }
    return baseColumns;
  };

  const overallStats = player?.stats?.overall || {};
  const weeklyStats = player?.stats?.weekly || [];

  return (
    <Modal
      title={`${player?.name} - ${player?.position} Stats`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <h3>Overall Stats</h3>
      <p>
        Games Played: {overallStats.gamesPlayed || 0}
        {player?.position === 'QB' && ` | Passing Yards: ${overallStats.passingYards || 0} | TDs: ${overallStats.touchdowns || 0} | INTs: ${overallStats.interceptions || 0}`}
        {player?.position === 'RB' && ` | Rushing Yards: ${overallStats.rushingYards || 0} | TDs: ${overallStats.touchdowns || 0} | Fumbles: ${overallStats.fumbles || 0}`}
        {player?.position === 'WR' && ` | Receiving Yards: ${overallStats.receivingYards || 0} | TDs: ${overallStats.touchdowns || 0} | Receptions: ${overallStats.receptions || 0}`}
        {player?.position === 'CB' && ` | Tackles: ${overallStats.tackles || 0} | INTs: ${overallStats.interceptions || 0} | Pass Deflections: ${overallStats.passDeflections || 0}`}
      </p>
      <h3>Weekly Stats</h3>
      <Table
        columns={getColumns(player?.position)}
        dataSource={weeklyStats}
        rowKey="week"
        pagination={false}
      />
    </Modal>
  );
};

export default PlayerStatsModal;
