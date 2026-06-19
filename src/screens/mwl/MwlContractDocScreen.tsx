import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Icon } from '../../components/Icon'

// ─────────────────────────────────────────────────────────────────────────────
// Loan Contract — the full "Loan for Consumption Contract" document the borrower
// reads before signing. Values pulled from the application are highlighted.
// Reached from the Review Final Terms screen's "View Full Contract".
// ─────────────────────────────────────────────────────────────────────────────
const BLUE = '#275CB2'
const HEADING = '#0B0F1A'
const BODY = '#2C4A78'
const HL = '#DCEAFB'

function P({ children }: { children: ReactNode }) {
  return <Typography sx={{ fontSize: 12.5, color: BODY, lineHeight: 1.62, mb: 1.25 }}>{children}</Typography>
}
function H4({ children }: { children: ReactNode }) {
  return <Typography sx={{ fontSize: 14, fontWeight: 800, color: HEADING, mt: 2.25, mb: 0.75 }}>{children}</Typography>
}
function Fill({ children }: { children: ReactNode }) {
  return <Box component="span" sx={{ bgcolor: HL, borderRadius: '3px', px: '3px', fontWeight: 600, color: '#1F4E8F' }}>{children}</Box>
}
function B({ children }: { children: ReactNode }) {
  return <Box component="strong" sx={{ fontWeight: 800, color: HEADING }}>{children}</Box>
}
function Terms({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <Box sx={{ border: '1px solid #ECEFF3', borderRadius: '10px', overflow: 'hidden', my: 1.25 }}>
      {rows.map(([k, v], i) => (
        <Box key={k} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, px: 1.5, py: 1.1, borderTop: i ? '1px solid #F2F4F7' : 'none' }}>
          <Typography sx={{ fontSize: 12, color: '#8A94A6', flexShrink: 0 }}>{k}</Typography>
          <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: HEADING, textAlign: 'right' }}>{v}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default function MwlContractDocScreen() {
  const navigate = useNavigate()
  return (
    <Box className="screen-enter" sx={{ position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#F5F5F5' }}>
      {/* Header */}
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', px: 1, py: 1.25, bgcolor: '#F5F5F5' }}>
        <IconButton onClick={() => navigate(-1)} aria-label="Back" sx={{ color: HEADING }}>
          <Icon name="arrowLeft" size={22} color={HEADING} />
        </IconButton>
        <Typography sx={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 800, color: HEADING }}>Loan Contract</Typography>
        <Box sx={{ width: 44 }} />
      </Box>

      <Box className="scroll-content" sx={{ flex: 1, px: 3, pt: 1, pb: 3 }}>
        {/* Highlight legend */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#EAF1FC', borderRadius: '12px', px: 1.75, py: 1.25, mb: 2 }}>
          <Icon name="info" size={18} color={BLUE} />
          <Typography sx={{ fontSize: 12.5, color: '#2B4A7E', lineHeight: 1.45 }}>
            <Box component="span" sx={{ fontWeight: 800 }}>Highlighted</Box> values are filled from your application.
          </Typography>
        </Box>

        {/* Document */}
        <Box sx={{ bgcolor: '#fff', border: '1px solid #E8EAEE', borderRadius: '14px', p: '20px 18px' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: HEADING, textAlign: 'center' }}>Loan for Consumption Contract</Typography>
          <Typography sx={{ fontSize: 10.5, color: '#999', textAlign: 'center', mb: 1.75 }}>
            Contract No. <Fill>Reference: MWL-2026-293562</Fill>
          </Typography>

          <P>This contract is entered into on <Fill>18 June 2026</Fill> between:</P>
          <P>
            <B>NH Finance Plc.</B>, a public limited company (with commercial registration No. <Fill>00045678</Fill> dated <Fill>15 March 2018</Fill>), licensed to undertake microfinance operation under the laws of the Kingdom of Cambodia and having registered address at No. <Fill>216, Street 271, Sangkat Toul Tompoung I, Khan Chamkarmon, Phnom Penh</Fill> (hereinafter the “Institution” or “Party A”); and
          </P>
          <P>
            Person named <Fill>Sok Vanna</Fill>, Gender: <Fill>Male</Fill>, Date of Birth: <Fill>14 May 1992</Fill>, Nationality: Khmer, holding Identity Card No. <Fill>010 234 567</Fill>, having a current address at <Fill>Sangkat Phsar Doeum Thkov, Khan Chamkarmon, Phnom Penh</Fill> (hereinafter “Party B”).
          </P>
          <P>(Party A and Party B are hereinafter referred to collectively as the “Parties” and individually as the “Party”). The Parties hereby agree as follows.</P>

          <H4>Clause 1. Loan or Credit</H4>
          <P>Party A agrees to provide, and Party B agrees to accept the loan as set out herein below (hereinafter the “Loan” or “Credit”):</P>
          <Terms
            rows={[
              ['Loan Type', <Fill>Migrant Worker Loan</Fill>],
              ['Loan Amount', <Fill>USD 2,000</Fill>],
              ['Purpose', <Fill>Overseas employment-related expenses (South Korea)</Fill>],
              ['Fixed Interest Rate', <Fill>1.50% per month</Fill>],
              ['Loan Tenor', <Fill>12 months (including 3 months interest-only)</Fill>],
              ['Loan Approval Expense', <Fill>3.00% of approved amount</Fill>],
              ['Administrative Expense', <Fill>CBC fee USD 10.00</Fill>],
            ]}
          />

          <H4>Clause 2. Loan Withdrawal or Disbursement</H4>
          <P>2.1. Party B may withdraw or request for disbursement of the Loan if Party B has fulfilled all obligations and conditions, precedent and subsequent, as stated in Annex 1 of this Loan for Consumption Contract.</P>
          <P>2.2. Party A will disburse to Party B the Loan in cash or through wire transfer into Party B’s account maintained with Party A unless otherwise stated in Annex 1 of this Loan for Consumption Contract.</P>

          <H4>Clause 3. Interest and Expenses</H4>
          <P>3.1. <B>Interest:</B> Party B agrees to pay interest in accordance with this Loan for Consumption Contract at a rate as set out in Clause 1 on the basis of daily interest calculation over the outstanding principal amount of the Loan.</P>
          <P>3.2. <B>Default Interest Rate:</B> In case where Party B fails to pay or to pay on time any amount due, Party B shall pay default interest at the rate of <Fill>10% (ten percent)</Fill> per annum over the overdue amount in addition to the Fixed Interest Rate set out in Clause 1 above.</P>
          <P>3.3. Party B shall be responsible for other expenses including: ☐ lawyer fee for contract preparation, ☐ collateral valuation cost, security registration cost and security deregistration cost, that Party B shall pay to relevant stakeholders. <Fill>None applicable to this Loan.</Fill></P>

          <H4>Clause 4. Repayment of Loan</H4>
          <P>4.1. Party B shall repay the Loan in accordance with the amount and regularly at the dates as set out in the repayment schedule provided by Party A.</P>
          <P>4.2.a. In case where Party B prepays the Loan in whole or in part during the lock-in period, being a period of up to half (1/2) of the entire Loan Tenor which however shall not exceed a maximum period of 24 months from the date of the initial loan disbursement (the “Lock-in Period”), Party B shall: (i) inform the Institution in writing at least 30 calendar days in advance; (ii) pay early settlement fee in an amount equal to 3% of the principal loan amount being prepaid.</P>
          <P>4.2.b. In case where Party B prepays the Loan in whole or in part after the Lock-in Period, Party B shall inform the Institution in writing at least 30 calendar days in advance. In case where Party B fails to inform as required, Party B shall pay early settlement expense in an amount equal to 1% of the principal loan amount being prepaid.</P>
          <P>4.3. In case where any payment received by Party A is less than the amount of payment due, Party A may apply such payment received in the following order for repayment purpose: (1) expenses, (2) default interest, (3) interest, and (4) principal.</P>
          <P>4.4. Party B agrees to provide an irrevocable standing order to allow Party A the right to debit from Party B’s saving account or current account for the purpose of payment of any indebtedness outstanding and due unless otherwise stated in Annex 1.</P>

          <H4>Clause 5. Security</H4>
          <P>To secure punctual and regular payment and repayment obligations of Party B under this Loan for Consumption Contract, Party B agrees to provide or to cause to be provided the required security/guaranty as follows:</P>
          <P>5.1. <B>Security over Immovable Property:</B> ☐ Applicable ☒ Non-applicable</P>
          <P>5.2. <B>Security over Movable Property:</B> ☐ Applicable ☒ Non-applicable</P>
          <P>5.3. <B>Guaranty:</B> ☒ Applicable ☐ Non-applicable</P>
          <Terms
            rows={[
              ['Name of Guarantor', <Fill>Chan Dara</Fill>],
              ['Identity Card No.', <Fill>010 887 654</Fill>],
              ['Relationship', <Fill>Spouse (1st)</Fill>],
            ]}
          />
          <P>The guarantor shall enter into separate guaranty contract with Party A as required by Party A.</P>

          <H4>Clause 6. Custody and Return of Property Title Certificate</H4>
          <P>6.1. Party B and the security provider agree to place under Party A’s custody the relevant certificate of ownership or possession of the property until full settlement of the Loan. <Fill>Not applicable — no immovable collateral.</Fill></P>
          <P>6.2. Party A agrees to return the certificate of ownership or possession together with a debt settlement letter within 07 working days following the final settlement of the Loan.</P>

          <H4>Clause 7. Events of Default</H4>
          <P>7.1. An Event of Default means a breach of contract or a failure to perform any obligation by Party B and/or the guarantor, including: (a) the Credit is not used for the purpose stated in Clause 1; (b) the use of Credit causes adverse environmental and social impact or supports any business activity restricted by laws; (c) Party B fails to repay the principal, interest, default interest, and/or any expense at the respective due date; (d) collateral is confiscated, seized or retained by any person or competent authority; (e) collateral is encumbered, sold or transferred without authorization by Party A; (f) Party B or any guarantor breaches any provision of this contract, any guaranty contract or any law in effect; (g) Party B is convicted of a criminal offense (under court judgement).</P>
          <P>7.2. In case any Event of Default happens: (a) Party A may require the Loan become immediately due and repaid fully or partially with accrued interest and all other amounts payable; (b) Party A has the right to meet Party B at Party B’s address or business location to identify an appropriate resolution; (c) Party A may exercise all or any remedies pursuant to this contract, the guaranty contract or as allowed by laws.</P>
          <P>7.3. Party B shall fully indemnify Party A from and against any expenses, loss, or damage incurred as a consequence of any Event of Default.</P>
          <P>7.4. Party A is entitled to capitalize and add to the indebtedness as principal any interest, default interest and/or other expenses as allowed by laws.</P>
          <P>7.5. The Parties agree that Party A shall have the right to freeze or set off any money from any accounts of Party B maintained with Party A for the purpose of payment of indebtedness.</P>

          <H4>Clause 8. Miscellaneous Provisions</H4>
          <P>8.1. <B>ESG and Client Protection:</B> Party B shall adhere to the Environmental, Social and Governance Principles and the Client Protection Principles as stated in Annex 2.</P>
          <P>8.2. <B>Provision and Disclosure of Information:</B> Party B shall provide and update relevant information and supporting documents as required by Party A, and agrees that Party A may disclose such data to the National Bank of Cambodia, the Credit Bureau (Cambodia), auditors, or other relevant authorities, partners or agents, or in accordance with court order or legal proceedings relating to the Loan.</P>
          <P>8.3. <B>Governing Law &amp; Dispute Resolution:</B> This contract shall be governed by the laws of the Kingdom of Cambodia. In case of any complaint, Party B may contact the Institution via telephone No. <Fill>023 990 000</Fill>, the Association of Banks in Cambodia (023 238 760 / 092 771 881) or the Cambodia Microfinance Association (015 365 222). Disputes not resolved amicably may be referred to the competent court of the Kingdom of Cambodia.</P>
          <P>8.4. <B>Modification:</B> Any modification or amendment shall only be valid if made in writing with signatures/thumbprints of the Parties.</P>
          <P>8.5. <B>Binding Effect:</B> This contract shall be binding upon the successors-in-title and assigns of Party A and the heirs and successors-in-title of Party B.</P>
          <P>8.6. <B>Entire Agreement:</B> The repayment schedules, the guaranty contract, annexes, and other related documents form part of this contract as entire agreement.</P>
          <P>8.7. <B>Severability:</B> If any provision shall be unenforceable or invalid under applicable law, the remaining provisions shall continue in full force and effect.</P>
          <P>8.8. <B>Assignment:</B> Party A may transfer and/or assign rights and obligations under this contract to any other person with or without consent of Party B. Party B shall not transfer or assign except with written consent of Party A.</P>

          <Typography sx={{ fontSize: 12.5, color: BODY, lineHeight: 1.62, mt: 1.75 }}>
            In witness whereof, the Parties have read and understood the entire substance of this Loan for Consumption Contract and have duly executed it on the date first specified above.
          </Typography>

          {/* Signatures */}
          <Box sx={{ display: 'flex', gap: 1.25, mt: 1.75 }}>
            <Box sx={{ flex: 1, border: '1px dashed #CCC', borderRadius: '8px', p: '10px', textAlign: 'center' }}>
              <Typography sx={{ fontSize: 10, fontWeight: 800, color: '#999', letterSpacing: '0.4px', mb: 0.75 }}>PARTY B</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#111' }}>Sok Vanna</Typography>
              <Typography sx={{ fontSize: 10, color: '#005EB8', mt: 0.5, lineHeight: 1.35 }}>e-signature via NH Loans App<br />(PIN-verified)</Typography>
            </Box>
            <Box sx={{ flex: 1, border: '1px dashed #CCC', borderRadius: '8px', p: '10px', textAlign: 'center' }}>
              <Typography sx={{ fontSize: 10, fontWeight: 800, color: '#999', letterSpacing: '0.4px', mb: 0.75 }}>PARTY A</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#111' }}>NH Finance Plc.</Typography>
              <Typography sx={{ fontSize: 10, color: '#888', mt: 0.5, lineHeight: 1.35 }}>Authorized Representative<br />Corporate Seal</Typography>
            </Box>
          </Box>

          <Typography sx={{ fontSize: 10.5, color: '#888', mt: 1.75, lineHeight: 1.5 }}>
            <B>Annex 1:</B> Loan Disbursement Conditions · <B>Annex 2:</B> Environmental, Social and Governance Principles and Client Protection Principles
          </Typography>
        </Box>
      </Box>

      {/* Sign CTA */}
      <Box sx={{ flexShrink: 0, px: 3, pt: 1.5, pb: '40px', bgcolor: '#F5F5F5' }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/mwl-sign')}
          sx={{ height: 54, borderRadius: '14px', fontSize: 16, fontWeight: 700, bgcolor: BLUE, '&:hover': { bgcolor: '#1F4F9E' } }}
        >
          Continue to Sign
        </Button>
      </Box>
    </Box>
  )
}
