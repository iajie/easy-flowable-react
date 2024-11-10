export const xmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    "<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:omgdc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:omgdi=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:flowable=\"http://flowable.org/bpmn\" id=\"definitions\" targetNamespace=\"http://www.flowable.org/processdef\">\n" +
    "  <process id=\"qjl\" name=\"请假\" isExecutable=\"true\">\n" +
    "    <startEvent id=\"StartEvent_1y45yut\" name=\"开始\">\n" +
    "      <outgoing>SequenceFlow_0h21x7r</outgoing>\n" +
    "    </startEvent>\n" +
    "    <sequenceFlow id=\"SequenceFlow_0h21x7r\" sourceRef=\"StartEvent_1y45yut\" targetRef=\"Task_1hcentk\" />\n" +
    "    <userTask id=\"Task_1hcentk\" name=\"提交资料\" flowable:assignee=\"${initiator}\">\n" +
    "      <incoming>SequenceFlow_0h21x7r</incoming>\n" +
    "      <outgoing>Flow_1sud6d3</outgoing>\n" +
    "    </userTask>\n" +
    "    <exclusiveGateway id=\"Gateway_02pc6yy\">\n" +
    "      <incoming>Flow_1sud6d3</incoming>\n" +
    "      <outgoing>Flow_1n3lmb5</outgoing>\n" +
    "      <outgoing>Flow_0tzppyn</outgoing>\n" +
    "    </exclusiveGateway>\n" +
    "    <sequenceFlow id=\"Flow_1sud6d3\" sourceRef=\"Task_1hcentk\" targetRef=\"Gateway_02pc6yy\" />\n" +
    "    <sequenceFlow id=\"Flow_1n3lmb5\" name=\"超过7天\" sourceRef=\"Gateway_02pc6yy\" targetRef=\"Activity_142qx65\" flowable:description=\"z\">\n" +
    "      <conditionExpression xsi:type=\"tFormalExpression\">${day &gt; 7}</conditionExpression>\n" +
    "    </sequenceFlow>\n" +
    "    <sequenceFlow id=\"Flow_0tzppyn\" name=\"领导审批\" sourceRef=\"Gateway_02pc6yy\" targetRef=\"Activity_152du67\">\n" +
    "      <conditionExpression xsi:type=\"tFormalExpression\">${day &lt;= 7}</conditionExpression>\n" +
    "    </sequenceFlow>\n" +
    "    <userTask id=\"Activity_152du67\" name=\"直系领导审批\" flowable:assignee=\"123\">\n" +
    "      <incoming>Flow_0tzppyn</incoming>\n" +
    "      <outgoing>Flow_0i1dh7i</outgoing>\n" +
    "    </userTask>\n" +
    "    <userTask id=\"Activity_142qx65\" name=\"老板审批\" flowable:assignee=\"01\">\n" +
    "      <incoming>Flow_1n3lmb5</incoming>\n" +
    "      <outgoing>Flow_1mdq4vb</outgoing>\n" +
    "    </userTask>\n" +
    "    <exclusiveGateway id=\"Gateway_1ectix4\">\n" +
    "      <incoming>Flow_1mdq4vb</incoming>\n" +
    "      <incoming>Flow_0i1dh7i</incoming>\n" +
    "      <outgoing>Flow_03unj8n</outgoing>\n" +
    "    </exclusiveGateway>\n" +
    "    <sequenceFlow id=\"Flow_1mdq4vb\" sourceRef=\"Activity_142qx65\" targetRef=\"Gateway_1ectix4\" />\n" +
    "    <sequenceFlow id=\"Flow_0i1dh7i\" sourceRef=\"Activity_152du67\" targetRef=\"Gateway_1ectix4\" />\n" +
    "    <sequenceFlow id=\"Flow_03unj8n\" sourceRef=\"Gateway_1ectix4\" targetRef=\"Activity_0ej12pn\" />\n" +
    "    <endEvent id=\"Event_1pwxbvo\" name=\"结束\">\n" +
    "      <incoming>Flow_1652dfa</incoming>\n" +
    "    </endEvent>\n" +
    "    <sequenceFlow id=\"Flow_1652dfa\" sourceRef=\"Activity_0ej12pn\" targetRef=\"Event_1pwxbvo\" />\n" +
    "    <userTask id=\"Activity_0ej12pn\" name=\"人事审批\" flowable:candidateUsers=\"125,126\">\n" +
    "      <incoming>Flow_03unj8n</incoming>\n" +
    "      <outgoing>Flow_1652dfa</outgoing>\n" +
    "    </userTask>\n" +
    "  </process>\n" +
    "  <bpmndi:BPMNDiagram id=\"BpmnDiagram_1\">\n" +
    "    <bpmndi:BPMNPlane id=\"BpmnPlane_1\" bpmnElement=\"qjl\">\n" +
    "      <bpmndi:BPMNShape id=\"StartEvent_1y45yut_di\" bpmnElement=\"StartEvent_1y45yut\">\n" +
    "        <omgdc:Bounds x=\"152\" y=\"102\" width=\"36\" height=\"36\" />\n" +
    "        <bpmndi:BPMNLabel>\n" +
    "          <omgdc:Bounds x=\"160\" y=\"145\" width=\"22\" height=\"14\" />\n" +
    "        </bpmndi:BPMNLabel>\n" +
    "      </bpmndi:BPMNShape>\n" +
    "      <bpmndi:BPMNShape id=\"Activity_0hoy50j_di\" bpmnElement=\"Task_1hcentk\">\n" +
    "        <omgdc:Bounds x=\"240\" y=\"80\" width=\"100\" height=\"80\" />\n" +
    "        <bpmndi:BPMNLabel />\n" +
    "      </bpmndi:BPMNShape>\n" +
    "      <bpmndi:BPMNShape id=\"Gateway_02pc6yy_di\" bpmnElement=\"Gateway_02pc6yy\" isMarkerVisible=\"true\">\n" +
    "        <omgdc:Bounds x=\"395\" y=\"95\" width=\"50\" height=\"50\" />\n" +
    "      </bpmndi:BPMNShape>\n" +
    "      <bpmndi:BPMNShape id=\"Activity_0kvq028_di\" bpmnElement=\"Activity_152du67\">\n" +
    "        <omgdc:Bounds x=\"570\" y=\"170\" width=\"100\" height=\"80\" />\n" +
    "      </bpmndi:BPMNShape>\n" +
    "      <bpmndi:BPMNShape id=\"Activity_0dyt1ki_di\" bpmnElement=\"Activity_142qx65\">\n" +
    "        <omgdc:Bounds x=\"570\" y=\"30\" width=\"100\" height=\"80\" />\n" +
    "        <bpmndi:BPMNLabel />\n" +
    "      </bpmndi:BPMNShape>\n" +
    "      <bpmndi:BPMNShape id=\"Gateway_1ectix4_di\" bpmnElement=\"Gateway_1ectix4\" isMarkerVisible=\"true\">\n" +
    "        <omgdc:Bounds x=\"805\" y=\"115\" width=\"50\" height=\"50\" />\n" +
    "      </bpmndi:BPMNShape>\n" +
    "      <bpmndi:BPMNShape id=\"Event_1pwxbvo_di\" bpmnElement=\"Event_1pwxbvo\">\n" +
    "        <omgdc:Bounds x=\"1232\" y=\"122\" width=\"36\" height=\"36\" />\n" +
    "        <bpmndi:BPMNLabel>\n" +
    "          <omgdc:Bounds x=\"1237\" y=\"165\" width=\"26\" height=\"17\" />\n" +
    "        </bpmndi:BPMNLabel>\n" +
    "      </bpmndi:BPMNShape>\n" +
    "      <bpmndi:BPMNShape id=\"Activity_0uvegx0_di\" bpmnElement=\"Activity_0ej12pn\">\n" +
    "        <omgdc:Bounds x=\"990\" y=\"100\" width=\"100\" height=\"80\" />\n" +
    "      </bpmndi:BPMNShape>\n" +
    "      <bpmndi:BPMNEdge id=\"SequenceFlow_0h21x7r_di\" bpmnElement=\"SequenceFlow_0h21x7r\">\n" +
    "        <omgdi:waypoint x=\"188\" y=\"120\" />\n" +
    "        <omgdi:waypoint x=\"240\" y=\"120\" />\n" +
    "      </bpmndi:BPMNEdge>\n" +
    "      <bpmndi:BPMNEdge id=\"Flow_1sud6d3_di\" bpmnElement=\"Flow_1sud6d3\">\n" +
    "        <omgdi:waypoint x=\"340\" y=\"120\" />\n" +
    "        <omgdi:waypoint x=\"395\" y=\"120\" />\n" +
    "      </bpmndi:BPMNEdge>\n" +
    "      <bpmndi:BPMNEdge id=\"Flow_1n3lmb5_di\" bpmnElement=\"Flow_1n3lmb5\">\n" +
    "        <omgdi:waypoint x=\"445\" y=\"120\" />\n" +
    "        <omgdi:waypoint x=\"498\" y=\"120\" />\n" +
    "        <omgdi:waypoint x=\"498\" y=\"70\" />\n" +
    "        <omgdi:waypoint x=\"570\" y=\"70\" />\n" +
    "        <bpmndi:BPMNLabel>\n" +
    "          <omgdc:Bounds x=\"520\" y=\"52\" width=\"47\" height=\"17\" />\n" +
    "        </bpmndi:BPMNLabel>\n" +
    "      </bpmndi:BPMNEdge>\n" +
    "      <bpmndi:BPMNEdge id=\"Flow_0tzppyn_di\" bpmnElement=\"Flow_0tzppyn\">\n" +
    "        <omgdi:waypoint x=\"420\" y=\"145\" />\n" +
    "        <omgdi:waypoint x=\"420\" y=\"210\" />\n" +
    "        <omgdi:waypoint x=\"570\" y=\"210\" />\n" +
    "        <bpmndi:BPMNLabel>\n" +
    "          <omgdc:Bounds x=\"412\" y=\"173\" width=\"52\" height=\"17\" />\n" +
    "        </bpmndi:BPMNLabel>\n" +
    "      </bpmndi:BPMNEdge>\n" +
    "      <bpmndi:BPMNEdge id=\"Flow_1mdq4vb_di\" bpmnElement=\"Flow_1mdq4vb\">\n" +
    "        <omgdi:waypoint x=\"670\" y=\"70\" />\n" +
    "        <omgdi:waypoint x=\"830\" y=\"70\" />\n" +
    "        <omgdi:waypoint x=\"830\" y=\"115\" />\n" +
    "      </bpmndi:BPMNEdge>\n" +
    "      <bpmndi:BPMNEdge id=\"Flow_0i1dh7i_di\" bpmnElement=\"Flow_0i1dh7i\">\n" +
    "        <omgdi:waypoint x=\"670\" y=\"210\" />\n" +
    "        <omgdi:waypoint x=\"830\" y=\"210\" />\n" +
    "        <omgdi:waypoint x=\"830\" y=\"165\" />\n" +
    "      </bpmndi:BPMNEdge>\n" +
    "      <bpmndi:BPMNEdge id=\"Flow_03unj8n_di\" bpmnElement=\"Flow_03unj8n\">\n" +
    "        <omgdi:waypoint x=\"855\" y=\"140\" />\n" +
    "        <omgdi:waypoint x=\"990\" y=\"140\" />\n" +
    "      </bpmndi:BPMNEdge>\n" +
    "      <bpmndi:BPMNEdge id=\"Flow_1652dfa_di\" bpmnElement=\"Flow_1652dfa\">\n" +
    "        <omgdi:waypoint x=\"1090\" y=\"140\" />\n" +
    "        <omgdi:waypoint x=\"1232\" y=\"140\" />\n" +
    "      </bpmndi:BPMNEdge>\n" +
    "    </bpmndi:BPMNPlane>\n" +
    "  </bpmndi:BPMNDiagram>\n" +
    "</definitions>";
